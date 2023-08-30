import { Toolbar, AppBar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
