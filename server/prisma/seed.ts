import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const note_first = await prisma.note.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Note Title 1",
      note: "I'm a note!",
    },
  });
  const note_second = await prisma.note.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Note Title 2",
      note: "????",
    },
  });
  const note_third = await prisma.note.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Note Title Not #3",
    },
  });
  console.log({ note_first, note_second, note_third });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
