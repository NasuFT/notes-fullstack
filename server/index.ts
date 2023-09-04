import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes";
import "dotenv/config";

const app = express();
const port = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());

app.use("/notes", notesRouter);

app.listen(port, () => console.log(`now listening on ${port}`));
