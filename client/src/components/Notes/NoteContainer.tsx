import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NoteItem from "./NoteItem";
import AddItem from "./AddItem";
import { Note } from "../../hooks/useNotes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface NoteContainerProps {
  initialNotes?: Note[];
  isAdding?: boolean;
  isDeleting?: boolean;
  isDeletePromptOpen?: boolean;
  isLoading?: boolean;
  onAddNote?: () => void | Promise<void>;
  onDeleteNote?: () => void;
  onTitleChange?: (id: Note["id"], title: string) => void;
  onNoteChange?: (id: Note["id"], note: string) => void;
  onDeletePromptOpen?: (id: Note["id"]) => void;
  onDeletePromptCancel?: () => void;
}

const NoteContainer = ({
  initialNotes = [],
  isAdding = false,
  isDeleting = false,
  isLoading = false,
  isDeletePromptOpen = false,
  onAddNote,
  onDeleteNote,
  onTitleChange,
  onNoteChange,
  onDeletePromptOpen,
  onDeletePromptCancel,
}: NoteContainerProps) => {
  return (
    <>
      <Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 3 }}>
        {initialNotes.map((note) => (
          <Grid xs={1} key={note.id}>
            <NoteItem
              initialTitle={note.title}
              initialNote={note.note}
              onTitleChange={(title) => onTitleChange?.(note.id, title)}
              onNoteChange={(text) => onNoteChange?.(note.id, text)}
              onDelete={() => onDeletePromptOpen?.(note.id)}
            />
          </Grid>
        ))}
        <Grid xs={1}>
          <AddItem
            sx={{ width: "100%" }}
            disabled={isAdding || isLoading}
            onClick={onAddNote}
            label="Add Note"
          />
        </Grid>
      </Grid>
      <Dialog open={isDeletePromptOpen}>
        <DialogTitle>{"Delete note?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => onDeletePromptCancel?.()}>
            Cancel
          </Button>
          <LoadingButton
            loading={isDeleting}
            onClick={onDeleteNote}
            variant="contained"
            color="error"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteContainer;
