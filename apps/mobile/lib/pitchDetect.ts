const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface PitchResult {
  note: string;
  octave: number;
  frequency: number;
  confidence: number;
}

function frequencyToNote(freq: number): { note: string; octave: number; cents: number } {
  const noteNum = 12 * (Math.log2(freq / 440)) + 69;
  const rounded = Math.round(noteNum);
  const cents = Math.round((noteNum - rounded) * 100);
  const noteIndex = ((rounded % 12) + 12) % 12;
  const octave = Math.floor(rounded / 12) - 1;
  return { note: NOTE_NAMES[noteIndex], octave, cents };
}

function decodeWav(buffer: ArrayBuffer): { sampleRate: number; samples: Float32Array } {
  const view = new DataView(buffer);
  const numChannels = view.getUint16(22, true);
  const sampleRate = view.getUint32(24, true);
  const bitsPerSample = view.getUint16(34, true);
  const bytesPerSample = bitsPerSample / 8;

  let dataOffset = 44;
  while (dataOffset < buffer.byteLength - 8) {
    const chunkId = String.fromCharCode(view.getUint8(dataOffset), view.getUint8(dataOffset + 1), view.getUint8(dataOffset + 2), view.getUint8(dataOffset + 3));
    const chunkSize = view.getUint32(dataOffset + 4, true);
    if (chunkId === 'data') {
      dataOffset += 8;
      break;
    }
    dataOffset += 8 + chunkSize;
  }

  const dataEnd = buffer.byteLength;
  const numSamples = Math.floor((dataEnd - dataOffset) / (bytesPerSample * numChannels));
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    let sum = 0;
    for (let ch = 0; ch < numChannels; ch++) {
      const offset = dataOffset + (i * numChannels + ch) * bytesPerSample;
      if (bitsPerSample === 16) {
        sum += view.getInt16(offset, true) / 32768;
      } else if (bitsPerSample === 8) {
        sum += (view.getUint8(offset) - 128) / 128;
      }
    }
    samples[i] = sum / numChannels;
  }

  return { sampleRate, samples };
}

function autocorrelation(samples: Float32Array, sampleRate: number): number {
  const minFreq = 60;
  const maxFreq = 2000;
  const minLag = Math.floor(sampleRate / maxFreq);
  const maxLag = Math.floor(sampleRate / minFreq);

  let bestLag = -1;
  let bestCorr = -1;

  for (let lag = minLag; lag <= Math.min(maxLag, samples.length / 2); lag++) {
    let corr = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < samples.length - lag; i++) {
      corr += samples[i] * samples[i + lag];
      normA += samples[i] * samples[i];
      normB += samples[i + lag] * samples[i + lag];
    }
    const norm = Math.sqrt(normA * normB);
    if (norm > 0) corr /= norm;

    if (corr > bestCorr) {
      bestCorr = corr;
      bestLag = lag;
    }
  }

  if (bestLag <= 0 || bestCorr < 0.3) return 0;
  return sampleRate / bestLag;
}

function getRms(samples: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) {
    sum += samples[i] * samples[i];
  }
  return Math.sqrt(sum / samples.length);
}

export async function detectPitchFromUri(uri: string): Promise<PitchResult | null> {
  try {
    const response = await fetch(uri);
    const buffer = await response.arrayBuffer();
    const { sampleRate, samples } = decodeWav(buffer);

    if (samples.length < sampleRate * 0.1) return null;

    const rms = getRms(samples);
    if (rms < 0.01) return null;

    const chunkSize = Math.floor(sampleRate * 0.05);
    const hopSize = Math.floor(chunkSize / 2);
    const pitches: number[] = [];

    for (let start = 0; start < samples.length - chunkSize; start += hopSize) {
      const chunk = samples.slice(start, start + chunkSize);
      const freq = autocorrelation(chunk, sampleRate);
      if (freq > 0) pitches.push(freq);
    }

    if (pitches.length === 0) return null;

    pitches.sort((a, b) => a - b);
    const median = pitches[Math.floor(pitches.length / 2)];
    const { note, octave, cents } = frequencyToNote(median);

    const confidence = Math.min(1, rms * 3);

    return { note, octave, frequency: Math.round(median * 100) / 100, confidence };
  } catch {
    return null;
  }
}

export function findClosestTarget(detected: PitchResult, targets: { note: string; freq: number }[]): { target: { note: string; freq: number }; distance: number; exact: boolean } | null {
  if (targets.length === 0) return null;

  let best = targets[0];
  let bestDist = Math.abs(detected.frequency - targets[0].freq);

  for (const t of targets) {
    const dist = Math.abs(detected.frequency - t.freq);
    if (dist < bestDist) {
      bestDist = dist;
      best = t;
    }
  }

  const semitones = 12 * Math.log2(detected.frequency / best.freq);
  const exact = Math.abs(semitones) < 0.5;

  return { target: best, distance: bestDist, exact };
}

export { frequencyToNote, NOTE_NAMES };
export type { PitchResult };
