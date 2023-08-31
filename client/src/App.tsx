import { Container, Paper, ThemeProvider } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";
import { useNotes } from "./hooks/useNotes";
import NoteContainer from "./components/Notes/NoteContainer";

const App = () => {
  const notes = useNotes((state) => state.notes);
  const addNote = useNotes((state) => state.addNote);
  const deleteNote = useNotes((state) => state.deleteNote);
  const updateNoteTitle = useNotes((state) => state.updateNoteTitle);
  const updateNoteText = useNotes((state) => state.updateNoteText);

  // const { isLoading, error, data } = useQuery(
  //   "fetchTodos",
  //   () => fetch("http://localhost:3000/notes").then((res) => res.json())
  // );

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} square sx={{ height: "100vh", overflow: "auto" }}>
        <NavBar />
        <Container fixed sx={{ paddingX: 1, paddingY: 2 }}>
          <NoteContainer
            notes={notes}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onNoteChange={updateNoteText}
            onTitleChange={updateNoteTitle}
          />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
