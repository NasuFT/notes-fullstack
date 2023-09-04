import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const notesRouter = express.Router();

notesRouter.get("/", async (_, res) => {
  const notes = await prisma.note.findMany();
  console.log(notes);
  res.json(notes);
});

notesRouter.post("/", async (req, res) => {
  const body = req.body;
  const data = await prisma.note.create({
    data: body,
    select: {
      id: true,
    },
  });
  console.log(data);
  res.status(201).json(data);
});

notesRouter.put("/", async (req, res) => {
  const { id, ...body } = req.body;
  await prisma.note.update({
    data: body,
    where: {
      id,
    },
  });
  res.end();
});

notesRouter.put("/batch", async (req, res) => {
  const body = req.body as { id: number; title?: string; note?: string }[];
  await prisma.$transaction(
    body.map(({ id, ...update }) =>
      prisma.note.update({ where: { id }, data: update })
    )
  );
  res.end();
});

notesRouter.delete("/:id", async (req, res) => {
  console.log("notes delete");
  const { id: _id } = req.params;

  if (typeof _id !== "string") {
    res.sendStatus(404);
  }

  const id = parseInt(_id);
  const note = await prisma.note.delete({
    where: { id },
  });
  console.log(`deleted ${note}`);
  res.end();
});

export default notesRouter;
