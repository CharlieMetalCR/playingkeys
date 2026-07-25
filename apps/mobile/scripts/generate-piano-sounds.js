const fs = require('fs');
const path = require('path');

const NOTES = [
  { name: 'c4', freq: 261.63 },
  { name: 'csharp4', freq: 277.18 },
  { name: 'd4', freq: 293.66 },
  { name: 'dsharp4', freq: 311.13 },
  { name: 'e4', freq: 329.63 },
  { name: 'f4', freq: 349.23 },
  { name: 'fsharp4', freq: 369.99 },
  { name: 'g4', freq: 392.0 },
  { name: 'gsharp4', freq: 415.3 },
  { name: 'a4', freq: 440.0 },
  { name: 'asharp4', freq: 466.16 },
  { name: 'b4', freq: 493.88 },
  { name: 'c5', freq: 523.25 },
  { name: 'csharp5', freq: 554.37 },
  { name: 'd5', freq: 587.33 },
  { name: 'dsharp5', freq: 622.25 },
  { name: 'e5', freq: 659.25 },
  { name: 'f5', freq: 698.46 },
  { name: 'fsharp5', freq: 739.99 },
  { name: 'g5', freq: 783.99 },
  { name: 'gsharp5', freq: 830.61 },
  { name: 'a5', freq: 880.0 },
  { name: 'asharp5', freq: 932.33 },
  { name: 'b5', freq: 987.77 },
  { name: 'c6', freq: 1046.50 },
];

const SAMPLE_RATE = 22050;
const DURATION = 0.8;
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

function createWav(freq) {
  const buffer = Buffer.alloc(44 + NUM_SAMPLES * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + NUM_SAMPLES * 2, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(NUM_SAMPLES * 2, 40);

  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const envelope = Math.exp(-t * 4);
    const sample = Math.sin(2 * Math.PI * freq * t) * envelope * 0.4;
    const val = Math.max(-1, Math.min(1, sample));
    buffer.writeInt16LE(Math.round(val * 32767), 44 + i * 2);
  }

  return buffer;
}

const outDir = path.join(__dirname, '..', 'assets', 'sounds');
for (const note of NOTES) {
  const wav = createWav(note.freq);
  fs.writeFileSync(path.join(outDir, `${note.name}.wav`), wav);
  console.log(`Created ${note.name}.wav (${wav.length} bytes)`);
}
console.log(`Generated ${NOTES.length} WAV files`);
