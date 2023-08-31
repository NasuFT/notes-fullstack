import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NoteItem from "./NoteItem";
import AddItem from "./AddItem";
import { Note } from "../../hooks/useNotes";

interface NoteContainerProps {
  notes: Note[];
  isAdding?: boolean;
  onAddNote?: () => void;
  onDeleteNote?: (id: Note["id"]) => void;
  onTitleChange?: (id: Note["id"], title: string) => void;
  onNoteChange?: (id: Note["id"], note: string) => void;
}

const NoteContainer = ({
  notes,
  isAdding = false,
  onAddNote,
  onDeleteNote,
  onTitleChange,
  onNoteChange,
}: NoteContainerProps) => (
  <Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 3 }}>
    {notes.map((note) => (
      <Grid xs={1} key={note.id}>
        <NoteItem
          title={note.title}
          note={note.note}
          onTitleChange={(title) => onTitleChange?.(note.id, title)}
          onNoteChange={(text) => onNoteChange?.(note.id, text)}
          onDelete={() => onDeleteNote?.(note.id)}
        />
      </Grid>
    ))}
    <Grid xs={1}>
      <AddItem
        sx={{ width: "100%" }}
        disabled={isAdding}
        onClick={onAddNote}
        label="Add Note"
      />
    </Grid>
  </Grid>
);

export default NoteContainer;
