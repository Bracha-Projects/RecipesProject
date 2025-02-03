import HomePage from "./HomePage"
import { Outlet } from "react-router"
import { AppBar, Box, Toolbar} from "@mui/material";
import NavBar from "./NavBar";
export default () => {

  return (
    <>
          <AppBar position="static">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
              <HomePage />
              <NavBar />
            </Toolbar>
          </AppBar>
          <main>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              minHeight="100vh"
              bgcolor="background.default"
              pt={2}
            >
              <Outlet />
            </Box>
          </main>
    </>

  )
}