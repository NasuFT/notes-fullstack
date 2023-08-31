import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const notesRouter = express.Router();

notesRouter.get("/", async (_, res) => {
  const notes = await prisma.note.findMany();
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
  res.status(201).json(data);
});

notesRouter.put("/", async (req, res) => {
  const { id, ...body } = req.body;
  const data = await prisma.note.update({
    data: body,
    where: {
      id,
    },
  });
  res.end();
});

export default notesRouter;
