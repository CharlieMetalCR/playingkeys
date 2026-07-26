import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Helper to cast content objects to Prisma.InputJsonValue
function json(content: Record<string, unknown>): Prisma.InputJsonValue {
  return content as Prisma.InputJsonValue;
}

async function main() {
  // Clean existing data
  await prisma.progress.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  // ─── Units ────────────────────────────────────────────────────────────
  const units = await Promise.all([
    prisma.unit.create({
      data: {
        number: 1,
        title: 'Discoveries: Higher, Lower, Quarter/Half Notes',
        description:
          'Discover higher and lower sounds on black keys, quarter notes, and half notes',
      },
    }),
    prisma.unit.create({
      data: {
        number: 2,
        title: 'Discoveries: p, f, Repeated Notes',
        description:
          'Discover piano (soft), forte (loud), dynamics, staccato, and repeated notes',
      },
    }),
    prisma.unit.create({
      data: {
        number: 3,
        title: 'Discoveries: Slur, Octave',
        description:
          'Discover slurs for smooth connected playing and octave signs (8va, 8vb)',
      },
    }),
    prisma.unit.create({
      data: {
        number: 4,
        title: 'Discoveries: 2nds',
        description: 'Discover intervals of a 2nd on white keys',
      },
    }),
    prisma.unit.create({
      data: {
        number: 5,
        title: 'Discovery: 3rds',
        description: 'Discover intervals of a 3rd',
      },
    }),
    prisma.unit.create({
      data: {
        number: 6,
        title: 'Discovery: Time Signatures',
        description: 'Discover time signatures and measure counting in 4/4',
      },
    }),
    prisma.unit.create({
      data: {
        number: 7,
        title: 'Discovery: 4ths',
        description: 'Discover intervals of a 4th',
      },
    }),
    prisma.unit.create({
      data: {
        number: 8,
        title: 'Discoveries: Whole Note, 5ths',
        description: 'Discover whole notes and intervals of a 5th',
      },
    }),
    prisma.unit.create({
      data: {
        number: 9,
        title: 'Discoveries: Bass Staff, Treble Staff, Grand Staff',
        description: 'Discover F clef, G clef, and the grand staff',
      },
    }),
  ]);

  // ─── Unit 1 Lessons ──────────────────────────────────────────────────
  // Discoveries: Higher, Lower, Quarter/Half Notes (difficulty 1)
  const unit1Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 1,
        title: 'Take Off',
        content: json({
          description:
            'Discover higher sounds by playing groups of 2 black keys going up the keyboard.',
          instructions:
            'Use pointer fingers. Play all 4 groups of 2 black keys, each group higher than the last.',
          notation: {
            type: 'pre-staff',
            groups: 4,
            notesPerGroup: 4,
            pattern: 'ascending',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          lyrics: 'Big air-liner, Get aboard the, Up we\'re climbing',
          concepts: ['higher', 'ascending', 'groups of 2 black keys'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 2,
        title: 'Landing',
        content: json({
          description:
            'Discover lower sounds — the opposite of Take Off. Groups descend.',
          instructions:
            'Same structure as Take Off but each group of 2 black keys is lower than the last.',
          notation: {
            type: 'pre-staff',
            groups: 4,
            notesPerGroup: 4,
            pattern: 'descending',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['lower', 'descending', 'groups of 2 black keys'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 3,
        title: 'In a Canoe',
        content: json({
          description:
            'Introduce quarter notes and half notes in a descending pattern.',
          instructions:
            'Like Landing but use quarter and half notes (J J d). Each group ends with a half note.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            rhythm: ['quarter', 'quarter', 'half'],
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['quarter note', 'half note', 'rhythm pattern'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 4,
        title: 'Space Ship',
        content: json({
          description:
            'Fly through space using higher and lower groups of black keys.',
          instructions:
            'Like In a Canoe — play groups that go higher and lower through space.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            rhythm: ['quarter', 'quarter', 'half'],
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['higher', 'lower', 'quarter notes', 'half notes'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 5,
        title: 'In a Garden',
        content: json({
          description:
            'Two groups of notes in a garden with a winding footpath and bird bath.',
          instructions:
            'Play two groups — the second group is higher than the first. Use what you have discovered.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            pattern: 'second group higher',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['higher', 'group comparison'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 6,
        title: 'Inchworm',
        content: json({
          description:
            'Two groups that inch along — each ends with two half notes.',
          instructions:
            'Like In a Garden. Two groups, each ending with two half notes. Second group is lower. Begins with a half note.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            pattern: 'second group lower',
            ending: 'two half notes per group',
            startsWith: 'half note',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['half notes', 'lower', 'group comparison'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 7,
        title: 'Rollerblades',
        content: json({
          description:
            'Second group is exactly like the first but higher — cruising on rollerblades.',
          instructions:
            'Play two groups identical in rhythm. Second group is higher. Circle all half notes.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            pattern: 'second group same rhythm, higher',
            activity: 'circle all half notes',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['half notes', 'higher', 'rhythm matching'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 8,
        title: 'Playing Frisbee',
        content: json({
          description:
            'Like Rollerblades but opposite — begins with a half note and second group is higher.',
          instructions:
            'Same rhythm as Rollerblades. Begins with a half note. Second group is higher. Circle all half notes.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            pattern: 'starts with half note, second group higher',
            activity: 'circle all half notes',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['half notes', 'higher', 'rhythm matching'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 2 Lessons ──────────────────────────────────────────────────
  // Discoveries: p, f, Repeated Notes (difficulty 1-2)
  const unit2Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 1,
        title: 'A Secret',
        content: json({
          description:
            'Discover piano (p) — play softly like whispering a secret.',
          instructions:
            'Play softly on groups of 3 black keys. Second group is like the first except higher.',
          notation: {
            type: 'pre-staff',
            dynamics: 'p (piano)',
            groups: 2,
            pattern: 'second group higher',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['piano', 'soft dynamics', 'groups of 3 black keys'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 2,
        title: 'Rock Band',
        content: json({
          description:
            'Discover forte (f) — play loudly like a rock band.',
          instructions:
            'Play loudly with energy. Like A Secret but opposite dynamics. Second group is lower.',
          notation: {
            type: 'pre-staff',
            dynamics: 'f (forte)',
            groups: 2,
            pattern: 'second group lower',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['forte', 'loud dynamics', 'groups of 3 black keys'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 3,
        title: 'On the Bleachers',
        content: json({
          description:
            'Discover repeated notes — one group is different from the other.',
          instructions:
            'Play repeated notes. Mix loud and soft dynamics. Notice which group is different.',
          notation: {
            type: 'pre-staff',
            articulation: 'repeated notes',
            dynamics: 'mixed p and f',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['repeated notes', 'dynamics contrast'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 4,
        title: 'Circus Clown',
        content: json({
          description:
            'A lively circus clown — second group is opposite of first. Staccato touch.',
          instructions:
            'Play lively and bouncy. Second group is opposite of first. Use staccato (short, detached notes).',
          notation: {
            type: 'pre-staff',
            articulation: 'staccato',
            dynamics: 'lively',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['staccato', 'opposite pattern', 'lively tempo'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 5,
        title: 'Bluebird',
        content: json({
          description:
            'A gentle bluebird — second group is opposite. Two half notes at the start of each group.',
          instructions:
            'Play gently. Second group is opposite of first. Each group begins with two half notes.',
          notation: {
            type: 'pre-staff',
            articulation: 'legato',
            startingRhythm: 'two half notes',
            dynamics: 'gentle',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['half notes', 'legato', 'gentle dynamics'],
        }),
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 6,
        title: 'Halloween',
        content: json({
          description:
            'Both hands play repeated notes — spooky contrast of soft and loud.',
          instructions:
            'Both hands play repeated notes. Second group is lower. Contrast soft and loud.',
          notation: {
            type: 'pre-staff',
            hands: 'both',
            articulation: 'repeated notes',
            dynamics: 'mixed p and f',
            pattern: 'second group lower',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
          concepts: ['both hands', 'repeated notes', 'dynamics contrast', 'lower'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 3 Lessons ──────────────────────────────────────────────────
  // Discoveries: Slur, Octave (difficulty 2)
  const unit3Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 1,
        title: 'Drifting',
        content: json({
          description:
            'Discover slurs — notes within a slur are smooth and connected.',
          instructions:
            'Play softly. Fingers 3-2-3 connect smoothly within each slur. Let notes drift.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
            dynamics: 'p (piano)',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Fingers 3-2-3',
          concepts: ['slur', 'legato', 'smooth connection', 'soft dynamics'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 2,
        title: 'Watch Out!',
        content: json({
          description:
            'RH fingers 3-2 connect smoothly — but play loudly!',
          instructions:
            'Right hand plays fingers 3-2 connecting smoothly within slurs. Play loud.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
            dynamics: 'f (forte)',
            hand: 'RH',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Fingers 3-2',
          concepts: ['slur', 'legato', 'forte dynamics'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 3,
        title: 'Climbing',
        content: json({
          description:
            'Discover octave signs — 8va means play higher, groups go from highest to lowest.',
          instructions:
            'Play 4 groups of notes. Use octave signs (8va higher). Groups go from highest to lowest.',
          notation: {
            type: 'pre-staff',
            groups: 4,
            octaves: ['8va'],
            pattern: 'highest to lowest',
          },
          keySignature: 'Groups of 2 black keys',
          concepts: ['octave signs', '8va', 'descending groups'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 4,
        title: 'Hang Gliding',
        content: json({
          description:
            'Slurs with octave higher — run and jump, then glide up.',
          instructions:
            'Play softly. Use slurs with 8va (octave higher). Run and jump, then glide upward.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
            octaves: ['8va'],
            dynamics: 'p (piano)',
          },
          keySignature: 'Groups of 2 black keys',
          concepts: ['slur', 'octave higher', 'soft dynamics', 'gliding'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 5,
        title: 'Summer Clouds',
        content: json({
          description:
            'Practice smooth slurs — number your fingers and play silently first.',
          instructions:
            'Number your fingers. Play silently on the cover first to feel the smooth slur motion.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
            practice: 'silent playing on cover',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Number your fingers',
          concepts: ['slur', 'legato', 'silent practice', 'finger awareness'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 6,
        title: 'The Schumanns',
        content: json({
          description:
            'Three slurs — the last slur is twice as long as the others.',
          instructions:
            'Play softly. Notice three slurs. The last slur is twice as long. Named after the Schumann family.',
          notation: {
            type: 'pre-staff',
            articulation: 'three slurs',
            pattern: 'last slur twice as long',
            dynamics: 'p (piano)',
          },
          keySignature: 'Groups of 2 black keys',
          concepts: ['slur', 'slur length comparison', 'soft dynamics'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 7,
        title: 'Submarine Dive',
        content: json({
          description:
            'Like The Schumanns but different — dive down loud and fast.',
          instructions:
            'Play loud, fast, and lively. Like The Schumanns structure but with different notes. Use octave lower.',
          notation: {
            type: 'pre-staff',
            articulation: 'three slurs',
            octaves: ['8vb'],
            dynamics: 'f (forte)',
            tempo: 'fast',
          },
          keySignature: 'Groups of 2 black keys',
          concepts: ['octave lower', 'forte dynamics', 'fast tempo', 'slur'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 4 Lessons ──────────────────────────────────────────────────
  // Discoveries: 2nds (difficulty 2)
  const unit4Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 1,
        title: 'Winter Fun',
        content: json({
          description:
            'White keys and 2nds — quarter note plus dotted half note rhythm.',
          instructions:
            'Play on white keys. Use quarter note and dotted half note rhythm. Second line is 8va higher.',
          notation: {
            type: 'pre-staff',
            keys: 'white',
            rhythm: ['quarter', 'dotted-half'],
            octaves: { line2: '8va higher' },
          },
          keySignature: 'White keys',
          concepts: ['2nds', 'white keys', 'dotted half note', '8va'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 2,
        title: 'Naptime',
        content: json({
          description:
            'RH begins on G, LH plays down a 2nd. Smooth and soft like naptime.',
          instructions:
            'Right hand begins on G. Left hand plays down a 2nd. Keep it smooth and soft.',
          notation: {
            type: 'pre-staff',
            rhStart: 'G',
            interval: '2nd below (LH)',
            dynamics: 'p (piano)',
          },
          keySignature: 'White keys',
          concepts: ['2nd interval', 'smooth legato', 'soft dynamics'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 3,
        title: 'Winter Night',
        content: json({
          description:
            'LH begins on F, RH plays up a 2nd — cold wind blowing on a winter night.',
          instructions:
            'Left hand begins on F. Right hand plays up a 2nd. Feel the cold wind blowing.',
          notation: {
            type: 'pre-staff',
            lhStart: 'F',
            interval: '2nd above (RH)',
          },
          keySignature: 'White keys',
          concepts: ['2nd interval', 'both hands'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 4,
        title: 'Scout Day',
        content: json({
          description:
            'Circle the 8va and 8vb signs — octave higher and lower.',
          instructions:
            'Circle the 8va (octave higher) and 8vb (octave lower) signs as you play.',
          notation: {
            type: 'pre-staff',
            octaves: ['8va', '8vb'],
            activity: 'circle octave signs',
          },
          keySignature: 'White keys',
          concepts: ['8va', '8vb', 'octave signs', '2nds'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 5,
        title: 'Thunderstorm',
        content: json({
          description:
            'Play in different octaves — RH begins, LH plays down a 2nd like thunder.',
          instructions:
            'Right hand begins. Left hand plays down a 2nd. Play in different octaves for a thunderstorm sound.',
          notation: {
            type: 'pre-staff',
            octaves: 'multiple',
            rhStart: true,
            interval: '2nd below (LH)',
          },
          keySignature: 'White keys',
          concepts: ['2nds', 'octave variation', 'both hands'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 6,
        title: 'Stubborn Mule',
        content: json({
          description:
            'LH begins, RH plays up a 2nd. 2nds played together as harmonic intervals.',
          instructions:
            'Left hand begins. Right hand plays up a 2nd. Play 2nds together (harmonic) — stubborn like a mule.',
          notation: {
            type: 'pre-staff',
            lhStart: true,
            interval: '2nd above (RH)',
            articulation: 'harmonic 2nds',
          },
          keySignature: 'White keys',
          concepts: ['2nd interval', 'harmonic 2nds', 'both hands together'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 7,
        title: 'Dinosaurs',
        content: json({
          description:
            'Both hands play fingers 4-3-2 — a new feel with 2nds.',
          instructions:
            'Both hands play fingers 4-3-2 on 2nds. Feel the new pattern.',
          notation: {
            type: 'pre-staff',
            hands: 'both',
            fingeringPattern: '4-3-2',
          },
          keySignature: 'White keys',
          fingering: 'Fingers 4-3-2 both hands',
          concepts: ['2nds', 'new fingering pattern', 'both hands'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[3].id,
        number: 8,
        title: 'Merrily We Roll Along',
        content: json({
          description:
            'RH begins, LH plays one octave lower — double bar at the end.',
          instructions:
            'Right hand begins. Left hand plays the same notes one octave lower. Notice the double bar at the end.',
          notation: {
            type: 'pre-staff',
            rhStart: true,
            lhOctave: 'one octave lower',
            ending: 'double bar',
          },
          keySignature: 'White keys',
          concepts: ['2nds', 'octave lower', 'double bar line'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 5 Lessons ──────────────────────────────────────────────────
  // Discovery: 3rds (difficulty 2-3)
  const unit5Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 1,
        title: 'Snowfall',
        content: json({
          description:
            'RH begins, LH plays down a 3rd — softly falling like whispering snow.',
          instructions:
            'Right hand begins. Left hand plays down a 3rd. Play softly like snow falling.',
          notation: {
            type: 'pre-staff',
            rhStart: true,
            interval: '3rd below (LH)',
            dynamics: 'p (piano)',
          },
          keySignature: 'White keys',
          concepts: ['3rd interval', 'soft dynamics', 'descending'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 2,
        title: 'Shells',
        content: json({
          description:
            'LH begins on A, RH plays up a 3rd — 3rds played together like bells.',
          instructions:
            'Left hand begins on A. Right hand plays up a 3rd. Play 3rds together (harmonic) — like shells that sound like bells.',
          notation: {
            type: 'pre-staff',
            lhStart: 'A',
            interval: '3rd above (RH)',
            articulation: 'harmonic 3rds',
          },
          keySignature: 'White keys',
          concepts: ['3rd interval', 'harmonic 3rds', 'both hands together'],
        }),
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 3,
        title: 'Parade',
        content: json({
          description:
            'Left, right, left — keep in step with a big drum banging. Uses 3rds.',
          instructions:
            'Play left, right, left — keep in step like a parade. Big drum banging with 3rd intervals.',
          notation: {
            type: 'pre-staff',
            pattern: 'left-right-left',
            interval: '3rds',
            dynamics: 'f (forte)',
          },
          keySignature: 'White keys',
          concepts: ['3rd interval', 'both hands alternating', 'loud dynamics'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 4,
        title: 'Tree House',
        content: json({
          description:
            'RH begins on finger 3, LH plays down a 3rd — building a tree house high and strong.',
          instructions:
            'Right hand begins on finger 3. Left hand plays down a 3rd. Build the tree house high and strong.',
          notation: {
            type: 'pre-staff',
            rhStart: true,
            rhFinger: 3,
            interval: '3rd below (LH)',
          },
          keySignature: 'White keys',
          fingering: 'RH finger 3',
          concepts: ['3rd interval', 'both hands'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 5,
        title: 'Stargazers',
        content: json({
          description:
            'RH plays 3-2-3 smoothly while LH plays repeated notes — a warm summer night.',
          instructions:
            'Right hand plays fingers 3-2-3 smoothly with slurs. Left hand plays repeated notes. Lie out on a warm summer night.',
          notation: {
            type: 'pre-staff',
            rhPattern: '3-2-3 slurred',
            lhPattern: 'repeated notes',
          },
          keySignature: 'White keys',
          fingering: 'RH: 3-2-3',
          concepts: ['3rds', 'slur', 'repeated notes', 'both hands different roles'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 6,
        title: "Beethoven's Ninth",
        content: json({
          description:
            'Two lines are almost alike — circle the different measure. Pairs of repeated notes.',
          instructions:
            'Compare two lines that look almost alike. Circle the different measure. Notice pairs of repeated notes.',
          notation: {
            type: 'pre-staff',
            pattern: 'two similar lines',
            activity: 'circle different measure',
            articulation: 'paired repeated notes',
          },
          keySignature: 'White keys',
          concepts: ['3rds', 'repeated notes', 'pattern comparison', 'musical form'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[4].id,
        number: 7,
        title: 'Skating',
        content: json({
          description:
            'Smooth slurs with numbered fingers — 3rds played together like skating.',
          instructions:
            'Number your fingers. Play smooth slurs. 3rds played together (harmonic). Glide like skating.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
            interval: 'harmonic 3rds',
          },
          keySignature: 'White keys',
          fingering: 'Number your fingers',
          concepts: ['3rds', 'slur', 'harmonic intervals', 'smooth playing'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 6 Lessons ──────────────────────────────────────────────────
  // Discovery: Time Signatures (difficulty 3)
  const unit6Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 1,
        title: 'Crocodile',
        content: json({
          description:
            'Discover 4/4 time signature — see the big crocodile wading in the Nile.',
          instructions:
            'Look for the 4/4 time signature. Count 1-2-3-4 in each measure. See the big crocodile wading.',
          notation: {
            type: 'staff',
            timeSignature: '4/4',
            meter: 'common time',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time signature', 'measures', 'beat counting'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 2,
        title: 'Snake Charmer',
        content: json({
          description:
            '4/4 time — look at the snake, make no mistake.',
          instructions:
            'Keep counting 1-2-3-4. Watch the rhythm carefully — look at the snake, make no mistake.',
          notation: {
            type: 'staff',
            timeSignature: '4/4',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'beat counting', 'rhythm precision'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 3,
        title: 'Centipede',
        content: json({
          description:
            '4/4 time — so many feet, hard to cross the street.',
          instructions:
            'Count carefully in 4/4. The centipede has so many feet — keep the beat steady.',
          notation: {
            type: 'staff',
            timeSignature: '4/4',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'steady beat', 'rhythm reading'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 4,
        title: 'Pumpkin Eater',
        content: json({
          description:
            'Four parts shown by slurs — Part 3 is like Part 1.',
          instructions:
            'The song has 4 parts shown by slurs. Part 3 is like Part 1. Pump-kin eat-er made a pump-kin pie.',
          notation: {
            type: 'staff',
            structure: '4 parts by slurs',
            pattern: 'Part 3 = Part 1',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'musical form', 'slur sections', 'pattern recognition'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 5,
        title: 'Camptown Races',
        content: json({
          description:
            'Four parts by slurs — play twice through. Camp-town race track.',
          instructions:
            'Four parts shown by slurs. Play the whole song twice. Camp-town race track\'s five miles long.',
          notation: {
            type: 'staff',
            structure: '4 parts by slurs',
            repeats: 'play twice',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'repeats', 'musical form', 'slur sections'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 6,
        title: 'Bedtime',
        content: json({
          description:
            'Compare lines 1 and 2 — slurs are twice as long. Uses 8va sign.',
          instructions:
            'Compare lines 1 and 2. Slurs in one line are twice as long. Look for the 8va sign.',
          notation: {
            type: 'staff',
            octaves: ['8va'],
            pattern: 'slurs twice as long',
            dynamics: 'p (piano)',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'slur comparison', '8va sign', 'soft dynamics'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[5].id,
        number: 7,
        title: 'Marching Band',
        content: json({
          description:
            'Three different musical ideas — silver flutes, toot toot!',
          instructions:
            'Notice three different musical ideas. Play with a marching band feel — silver flutes, toot toot!',
          notation: {
            type: 'staff',
            structure: '3 distinct ideas',
            dynamics: 'mixed',
          },
          keySignature: 'White keys',
          concepts: ['4/4 time', 'musical form', '3 ideas', 'character playing'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 7 Lessons ──────────────────────────────────────────────────
  // Discovery: 4ths (difficulty 3-4)
  const unit7Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[6].id,
        number: 1,
        title: 'Railroad Crossing',
        content: json({
          description:
            'LH begins, RH plays up a 4th — stop and look, watch out for trains!',
          instructions:
            'Left hand begins. Right hand plays up a 4th. Stop and look at the railroad crossing — watch out for trains.',
          notation: {
            type: 'staff',
            lhStart: true,
            interval: '4th above (RH)',
          },
          keySignature: 'White keys',
          concepts: ['4th interval', 'both hands', 'interval recognition'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[6].id,
        number: 2,
        title: 'Noisy Neighbors',
        content: json({
          description:
            'RH begins, LH plays down a 4th — why must you shout? Can\'t you whisper?',
          instructions:
            'Right hand begins. Left hand plays down a 4th. Why must you shout? Try whispering!',
          notation: {
            type: 'staff',
            rhStart: true,
            interval: '4th below (LH)',
          },
          keySignature: 'White keys',
          concepts: ['4th interval', 'dynamics contrast', 'descending'],
        }),
        difficulty: 3,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[6].id,
        number: 3,
        title: 'Ship Ahoy!',
        content: json({
          description:
            'LH begins, RH plays up a 4th — let\'s go sailing, ship ahoy!',
          instructions:
            'Left hand begins. Right hand plays up a 4th. Let\'s go sailing — ship ahoy!',
          notation: {
            type: 'staff',
            lhStart: true,
            interval: '4th above (RH)',
          },
          keySignature: 'White keys',
          concepts: ['4th interval', 'ascending', 'both hands'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[6].id,
        number: 4,
        title: 'Ranch Mail',
        content: json({
          description:
            'Riding along a lazy trail, bringing the boys their weekly mail.',
          instructions:
            'Play at a relaxed pace — riding along a lazy trail, bringing the weekly mail.',
          notation: {
            type: 'staff',
            interval: '4ths',
          },
          keySignature: 'White keys',
          concepts: ['4th intervals', 'character playing', 'relaxed tempo'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[6].id,
        number: 5,
        title: 'Rocket Ship',
        content: json({
          description:
            'Circle alike and different measures — last slur is twice as long.',
          instructions:
            'Circle measures that are alike and different. The last slur is twice as long. Fly the rocket ship!',
          notation: {
            type: 'staff',
            pattern: 'compare alike/different measures',
            articulation: 'last slur twice as long',
          },
          keySignature: 'White keys',
          concepts: ['4th intervals', 'musical form', 'slur length', 'pattern comparison'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 8 Lessons ──────────────────────────────────────────────────
  // Discoveries: Whole Note, 5ths (difficulty 4)
  const unit8Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 1,
        title: 'Pussy Willows',
        content: json({
          description:
            'Discover whole notes — circle them at the end of each line.',
          instructions:
            'Circle the whole notes at the end of each line. Pussy willows can\'t meow.',
          notation: {
            type: 'staff',
            noteType: 'whole note',
            activity: 'circle whole notes',
          },
          keySignature: 'White keys',
          concepts: ['whole note', 'note duration', 'visual identification'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 2,
        title: 'Oh, My!',
        content: json({
          description:
            'RH begins, LH plays down a 5th on E — hear the special sound of 5ths.',
          instructions:
            'Right hand begins. Left hand plays down a 5th on E. Listen to the special sound of 5ths together. What a shame — I have hiccups!',
          notation: {
            type: 'staff',
            rhStart: true,
            interval: '5th below on E (LH)',
            specialFeature: 'harmonic 5ths',
          },
          keySignature: 'White keys',
          concepts: ['5th interval', 'harmonic 5ths', 'special sound quality'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 3,
        title: 'King George V',
        content: json({
          description:
            'LH begins, RH plays up a 5th — both hands move down in measure 3.',
          instructions:
            'Left hand begins. Right hand plays up a 5th. Both hands move down together in measure 3.',
          notation: {
            type: 'staff',
            lhStart: true,
            interval: '5th above (RH)',
            specialMeasure: 'measure 3 — both hands move down',
          },
          keySignature: 'White keys',
          concepts: ['5th interval', 'both hands together', 'measure awareness'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 4,
        title: 'Square Dance',
        content: json({
          description:
            'Circle whole notes — the fiddler\'s tuning up. Second line is opposite of first.',
          instructions:
            'Circle the whole notes. The fiddler\'s tuning up to play. Second line is opposite of first line.',
          notation: {
            type: 'staff',
            noteType: 'whole note',
            activity: 'circle whole notes',
            pattern: '2nd line opposite of 1st',
          },
          keySignature: 'White keys',
          concepts: ['whole note', 'musical form', 'pattern comparison'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 5,
        title: 'Clouds',
        content: json({
          description:
            'Black and white keys together — a special sound. Damper pedal optional.',
          instructions:
            'Combine black and white keys for a special sound. Use the damper pedal if available.',
          notation: {
            type: 'staff',
            keys: 'black and white combined',
            pedal: 'damper pedal optional',
          },
          keySignature: 'Black and white keys combined',
          concepts: ['5ths', 'mixed keys', 'damper pedal', 'sound color'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[7].id,
        number: 6,
        title: 'Old MacDonald',
        content: json({
          description:
            'Circle finger numbers — loud or soft, fast or slow, with farm animals.',
          instructions:
            'Circle the finger numbers. Play loud or soft, fast or slow. Make animal sounds for the farm.',
          notation: {
            type: 'staff',
            activity: 'circle finger numbers',
            tempo: 'flexible',
            dynamics: 'flexible',
          },
          keySignature: 'White keys',
          concepts: ['5ths', 'finger awareness', 'tempo choices', 'dynamic choices'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
  ]);

  // ─── Unit 9 Lessons ──────────────────────────────────────────────────
  // Discoveries: Bass Staff, Treble Staff, Grand Staff (difficulty 4-5)
  const unit9Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 1,
        title: 'Bass Staff',
        content: json({
          description:
            'Learn the bass staff with F clef — notes in the lower part of the grand staff.',
          instructions:
            'Study the bass staff (F clef). Middle C is the 5th above Bass F. Learn the note names on the bass staff.',
          notation: {
            type: 'staff',
            clef: 'bass (F clef)',
            feature: 'Middle C = 5th above Bass F',
          },
          keySignature: 'Grand staff',
          concepts: ['bass staff', 'F clef', 'note names', 'Middle C position'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 2,
        title: 'Treble Staff',
        content: json({
          description:
            'Learn the treble staff with G clef — notes in the upper part of the grand staff.',
          instructions:
            'Study the treble staff (G clef). Middle C is the 5th below Treble G. Learn the note names on the treble staff.',
          notation: {
            type: 'staff',
            clef: 'treble (G clef)',
            feature: 'Middle C = 5th below Treble G',
          },
          keySignature: 'Grand staff',
          concepts: ['treble staff', 'G clef', 'note names', 'Middle C position'],
        }),
        difficulty: 4,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 3,
        title: 'Walking on Stilts',
        content: json({
          description:
            'Circle the clef signs — RH plays treble, LH plays Middle C. Whole notes.',
          instructions:
            'Circle the clef signs. Right hand plays treble staff. Left hand plays Middle C. Use whole notes.',
          notation: {
            type: 'grand staff',
            activity: 'circle clef signs',
            rh: 'treble staff',
            lh: 'Middle C',
            noteType: 'whole note',
          },
          keySignature: 'Grand staff',
          concepts: ['grand staff', 'clef signs', 'treble', 'Middle C', 'whole notes'],
        }),
        difficulty: 5,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 4,
        title: 'Tumbleweed',
        content: json({
          description:
            'Circle the clef signs — LH plays bass staff, RH plays Middle C.',
          instructions:
            'Circle the clef signs. Left hand plays bass staff. Right hand plays Middle C.',
          notation: {
            type: 'grand staff',
            activity: 'circle clef signs',
            lh: 'bass staff',
            rh: 'Middle C',
          },
          keySignature: 'Grand staff',
          concepts: ['grand staff', 'bass clef', 'Middle C', 'both hands'],
        }),
        difficulty: 5,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 5,
        title: 'Quiet Evening',
        content: json({
          description:
            'RH begins on treble staff, LH on Middle C — fingers numbered.',
          instructions:
            'Right hand begins on treble staff. Left hand on Middle C. Number your fingers carefully.',
          notation: {
            type: 'grand staff',
            rh: 'treble staff (begins)',
            lh: 'Middle C',
          },
          keySignature: 'Grand staff',
          fingering: 'Number your fingers',
          concepts: ['grand staff', 'treble and bass', 'finger numbering'],
        }),
        difficulty: 5,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 6,
        title: 'Sunny Morning',
        content: json({
          description:
            'Circle the clef signs — LH begins on bass staff, RH on Middle C.',
          instructions:
            'Circle the clef signs. Left hand begins on bass staff. Right hand plays Middle C.',
          notation: {
            type: 'grand staff',
            activity: 'circle clef signs',
            lh: 'bass staff (begins)',
            rh: 'Middle C',
          },
          keySignature: 'Grand staff',
          concepts: ['grand staff', 'bass clef', 'Middle C', 'reading both clefs'],
        }),
        difficulty: 5,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[8].id,
        number: 7,
        title: 'Graduation March',
        content: json({
          description:
            'Two pages long — RH on treble, LH on Middle C. Play page 70, then 71, then 70 again.',
          instructions:
            'This is a two-page piece. RH plays treble staff, LH plays Middle C. Play page 70, then 71, then return to page 70.',
          notation: {
            type: 'grand staff',
            length: 'two pages',
            rh: 'treble staff',
            lh: 'Middle C',
            structure: 'page 70 → page 71 → page 70',
          },
          keySignature: 'Grand staff',
          concepts: ['grand staff', 'multi-page form', 'treble and bass', 'musical structure'],
        }),
        difficulty: 5,
        isPublished: true,
      },
    }),
  ]);

  // ─── Sample Users ─────────────────────────────────────────────────────
  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@playingkeys.com',
      name: 'Sample Teacher',
      password: 'hashed-password-here',
      role: 'TEACHER',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@playingkeys.com',
      name: 'Admin User',
      password: 'hashed-password-here',
      role: 'ADMIN',
    },
  });

  await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      bio: 'Experienced piano teacher with 10+ years of teaching',
    },
  });

  await prisma.admin.create({
    data: {
      userId: adminUser.id,
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@playingkeys.com',
      name: 'Demo Student',
      password: 'hashed-password-here',
      role: 'STUDENT',
    },
  });

  await prisma.student.create({
    data: {
      userId: studentUser.id,
      teacherId: (await prisma.teacher.findFirst())!.id,
    },
  });

  console.log(`Student user: student@playingkeys.com (id: ${studentUser.id})`);

  // ─── Summary ──────────────────────────────────────────────────────────
  const totalLessons =
    unit1Lessons.length +
    unit2Lessons.length +
    unit3Lessons.length +
    unit4Lessons.length +
    unit5Lessons.length +
    unit6Lessons.length +
    unit7Lessons.length +
    unit8Lessons.length +
    unit9Lessons.length;

  console.log('Seed data created successfully!');
  console.log(`Created ${units.length} units`);
  console.log(`Created ${totalLessons} lessons`);
  console.log(`  Unit 1 (Higher/Lower): ${unit1Lessons.length} lessons`);
  console.log(`  Unit 2 (p, f, Repeated): ${unit2Lessons.length} lessons`);
  console.log(`  Unit 3 (Slur, Octave): ${unit3Lessons.length} lessons`);
  console.log(`  Unit 4 (2nds): ${unit4Lessons.length} lessons`);
  console.log(`  Unit 5 (3rds): ${unit5Lessons.length} lessons`);
  console.log(`  Unit 6 (Time Sig): ${unit6Lessons.length} lessons`);
  console.log(`  Unit 7 (4ths): ${unit7Lessons.length} lessons`);
  console.log(`  Unit 8 (Whole/5ths): ${unit8Lessons.length} lessons`);
  console.log(`  Unit 9 (Staff): ${unit9Lessons.length} lessons`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
