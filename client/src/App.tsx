import { Container, Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import NoteContainer from "./components/Notes/NoteContainer";
import { useNotes } from "./hooks/useNotes";
import { useEffect, useState } from "react";

const App = () => {
  const [toDeleteID, setToDeleteID] = useState<number | null>(null);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

  const {
    isInitialLoading,
    notes,
    addNote,
    isAdding,
    isDeleting,
    deleteNote,
    queueUpdate,
    willUpdate,
    updateStatus,
  } = useNotes({
    onDeleteSuccess: () => {
      setToDeleteID(null);
      setIsDeletePromptOpen(false);
    },
  });

  const handleDeletePromptOpen = (id: number) => {
    setToDeleteID(id);
    setIsDeletePromptOpen(true);
  };

  const handleDeletePromptCancel = () => {
    setToDeleteID(null);
    setIsDeletePromptOpen(false);
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [autohideDuration, setAutohideDuration] = useState<
    number | null | undefined
  >();
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    if (willUpdate) {
      setIsSnackbarOpen(true);
      setAutohideDuration(null);
      setSnackbarMessage("Changes detected. Autosaving...");
    }
  }, [willUpdate]);

  useEffect(() => {
    if (updateStatus === "success") {
      setIsSnackbarOpen(true);
      setAutohideDuration(5000);
      setSnackbarMessage("Saved!");
    }
  }, [updateStatus]);

  return (
    <Paper elevation={0} square sx={{ height: "100vh", overflow: "auto" }}>
      <NavBar />
      <Container fixed sx={{ paddingX: 1, paddingY: 2 }}>
        <NoteContainer
          initialNotes={notes}
          isLoading={isInitialLoading}
          isDeleting={isDeleting}
          isAdding={isAdding}
          isDeletePromptOpen={isDeletePromptOpen}
          isSnackbarOpen={isSnackbarOpen}
          snackbarAutohideDuration={autohideDuration}
          snackbarMessage={snackbarMessage}
          onSnackbarClose={() => setIsSnackbarOpen(false)}
          onAddNote={addNote}
          onDeleteNote={() => deleteNote(toDeleteID!)}
          onDeletePromptOpen={handleDeletePromptOpen}
          onDeletePromptCancel={handleDeletePromptCancel}
          onNoteChange={(id, note) => queueUpdate(id, { note })}
          onTitleChange={(id, title) => queueUpdate(id, { title })}
        />
      </Container>
    </Paper>
  );
};

export default App;
