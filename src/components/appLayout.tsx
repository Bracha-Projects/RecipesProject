import { createContext } from "react";
import HomePage from "./HomePage"
import { Outlet } from "react-router"
import { User } from "../types/user";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Reduce, { Action } from "./Reduser";
import NavBar from "./NavBar";

export const url = 'http://localhost:3000/api/user'
export const Reducer = createContext<{
  user: User;
  userDispatch: React.Dispatch<Action>;
}>({
  user: {} as User,
  userDispatch: () => { }
});
export default () => {
  const { user, userDispatch } = Reduce();
  return (
    <>
      <Reducer.Provider value={{ user, userDispatch }}>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <HomePage/>
            <NavBar/>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
          >
            <Outlet />
          </Box>
        </main>
      </Reducer.Provider>
    </>

  )
}