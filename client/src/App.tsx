import { Container, Paper, ThemeProvider } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";
import NoteContainer from "./components/Notes/NoteContainer";
import { useNotes } from "./hooks/useNotes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Paper elevation={0} square sx={{ height: "100vh", overflow: "auto" }}>
          <NavBar />
          <Container fixed sx={{ paddingX: 1, paddingY: 2 }}>
            <NoteContainer
              initialNotes={notes}
              isLoading={isInitialLoading}
              isDeleting={isDeleting}
              isAdding={isAdding}
              isDeletePromptOpen={isDeletePromptOpen}
              onAddNote={addNote}
              onDeleteNote={() => deleteNote(toDeleteID!)}
              onDeletePromptOpen={handleDeletePromptOpen}
              onDeletePromptCancel={handleDeletePromptCancel}
              onNoteChange={(id, note) => queueUpdate(id, { note })}
              onTitleChange={(id, title) => queueUpdate(id, { title })}
            />
          </Container>
        </Paper>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
