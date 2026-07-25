import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  // Create Units
  const units = await Promise.all([
    prisma.unit.create({
      data: {
        number: 1,
        title: 'Discoveries: Higher, Lower',
        description: 'Learn about higher and lower sounds, quarter notes, and half notes',
      },
    }),
    prisma.unit.create({
      data: {
        number: 2,
        title: 'Discoveries: p, f, Repeated Notes',
        description: 'Learn about piano (soft), forte (loud), and repeated notes',
      },
    }),
    prisma.unit.create({
      data: {
        number: 3,
        title: 'Discoveries: Slur, Octave',
        description: 'Learn about slurs and octave signs',
      },
    }),
    prisma.unit.create({
      data: {
        number: 4,
        title: 'Discoveries: 2nds',
        description: 'Learn about intervals of a 2nd',
      },
    }),
    prisma.unit.create({
      data: {
        number: 5,
        title: 'Discovery: 3rds',
        description: 'Learn about intervals of a 3rd',
      },
    }),
    prisma.unit.create({
      data: {
        number: 6,
        title: 'Discovery: Time Signatures',
        description: 'Learn about time signatures and measure counting',
      },
    }),
    prisma.unit.create({
      data: {
        number: 7,
        title: 'Discovery: 4ths',
        description: 'Learn about intervals of a 4th',
      },
    }),
    prisma.unit.create({
      data: {
        number: 8,
        title: 'Discoveries: Whole Note, 5ths',
        description: 'Learn about whole notes and intervals of a 5th',
      },
    }),
    prisma.unit.create({
      data: {
        number: 9,
        title: 'Discoveries: Bass Staff, Treble Staff, Grand Staff',
        description: 'Learn about F clef, G clef, and the grand staff',
      },
    }),
  ]);

  // Create Lessons for Unit 1
  const unit1Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 1,
        title: 'Take Off',
        content: {
          description: 'Learn about higher sounds',
          instructions: 'Play all pieces on groups of 2 black keys using pointer fingers.',
          notation: {
            type: 'pre-staff',
            groups: 4,
            notesPerGroup: 4,
            pattern: 'Higher ascending',
          },
          lyrics: 'Big air-liner, Get aboard the, Up we\'re climbing',
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
        },
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 2,
        title: 'Landing',
        content: {
          description: 'Learn about lower sounds',
          instructions: 'Opposite of Take Off - sounds get lower.',
          notation: {
            type: 'pre-staff',
            groups: 4,
            notesPerGroup: 4,
            pattern: 'Lower descending',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
        },
        difficulty: 1,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[0].id,
        number: 3,
        title: 'In a Canoe',
        content: {
          description: 'Learn about quarter notes and half notes',
          instructions: 'Like Landing but with quarter notes and half notes.',
          notation: {
            type: 'pre-staff',
            groups: 2,
            rhythm: ['quarter', 'quarter', 'half'],
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Pointer fingers (2)',
        },
        difficulty: 1,
        isPublished: true,
      },
    }),
  ]);

  // Create Lessons for Unit 2
  const unit2Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 1,
        title: 'A Secret',
        content: {
          description: 'Learn about piano (soft) playing',
          instructions: 'Play softly with a gentle touch.',
          notation: {
            type: 'pre-staff',
            dynamics: 'p (piano)',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
        },
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[1].id,
        number: 2,
        title: 'Rock Band',
        content: {
          description: 'Learn about forte (loud) playing',
          instructions: 'Play loudly with energy.',
          notation: {
            type: 'pre-staff',
            dynamics: 'f (forte)',
          },
          keySignature: 'Groups of 3 black keys',
          fingering: 'Pointer fingers (2)',
        },
        difficulty: 2,
        isPublished: true,
      },
    }),
  ]);

  // Create Lessons for Unit 3
  const unit3Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 1,
        title: 'Drifting',
        content: {
          description: 'Learn about slurs - smooth connected notes',
          instructions: 'Notes within a slur should sound smooth and connected.',
          notation: {
            type: 'pre-staff',
            articulation: 'slur',
          },
          keySignature: 'Groups of 2 black keys',
          fingering: 'Fingers 3-2-3',
        },
        difficulty: 2,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        unitId: units[2].id,
        number: 2,
        title: 'Climbing',
        content: {
          description: 'Learn about octave signs',
          instructions: '8va means octave higher, 8vb means octave lower.',
          notation: {
            type: 'pre-staff',
            octaves: ['8va', '8vb'],
          },
          keySignature: 'Groups of 2 black keys',
        },
        difficulty: 2,
        isPublished: true,
      },
    }),
  ]);

  // Create sample teacher and admin
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

  console.log('Seed data created successfully!');
  console.log(`Created ${units.length} units`);
  console.log(`Created ${unit1Lessons.length + unit2Lessons.length + unit3Lessons.length} lessons`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });