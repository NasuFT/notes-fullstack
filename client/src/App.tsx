import { Paper, ThemeProvider } from "@mui/material";
import theme from "./theme";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} square style={{ height: "100vh" }}>
        <NavBar />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
