import { Container, Paper, ThemeProvider } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";
import Grid from "@mui/material/Unstable_Grid2";
import { useNotes } from "./hooks/useNotes";
import NoteGroup from "./components/Notes/NoteGroup";
import NoteItem from "./components/Notes/NoteItem";
import AddItem from "./components/Notes/AddItem";

const App = () => {
  const groups = useNotes((state) => state.groups);
  const notes = useNotes((state) => state.notes);
  const addGroup = useNotes((state) => state.addGroup);
  const deleteGroup = useNotes((state) => state.deleteGroup);
  const addNote = useNotes((state) => state.addNote);
  const deleteNote = useNotes((state) => state.deleteNote);

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} square sx={{ height: "100vh", overflow: "auto" }}>
        <NavBar />
        <Container fixed sx={{ paddingX: 1, paddingY: 2 }}>
          <Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 3 }}>
            {groups.map((group) => (
              <Grid xs={1} key={group.id}>
                <NoteGroup
                  title={group.title}
                  onDelete={() => deleteGroup(group.id)}
                >
                  {notes
                    .filter((item) => item.groupId === group.id)
                    .map((item) => (
                      <NoteItem
                        key={item.id}
                        title={item.title}
                        note={item.note}
                        onDelete={() => {
                          console.log("clicked");
                          deleteNote(item.id);
                        }}
                      />
                    ))}
                  <AddItem
                    sx={{ marginX: 1, marginBottom: 1.5 }}
                    onClick={() => addNote(group.id)}
                    label="Add Note"
                  />
                </NoteGroup>
              </Grid>
            ))}
            <Grid xs={1}>
              <AddItem
                sx={{ width: "100%" }}
                onClick={addGroup}
                label="Add Group"
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
