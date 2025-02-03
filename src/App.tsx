import './App.css'
import { RouterProvider } from 'react-router-dom';
import { Router } from './router';
import { Provider, useDispatch } from 'react-redux';
import store, { AddDispatch } from './redux/Store';
import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { User } from './types/user';
import Reduce, { Action } from "./components/Reduser";
export const IsLoggedIn = createContext<{ LoggedIn: boolean; setLoggedIn: Dispatch<SetStateAction<boolean>> }>({ LoggedIn: false, setLoggedIn: () => { } });
export const Reducer = createContext<{
    user: User;
    userDispatch: React.Dispatch<Action>;
}>({
    user: {} as User,
    userDispatch: () => { }
});
const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50', 
        },
    },
});
export const url = 'http://localhost:3000/api/user'
const App = () => {
    const { user, userDispatch } = Reduce();
    const [LoggedIn, setLoggedIn] = useState(false);
    return (<>
        <ThemeProvider theme={theme}>
            <IsLoggedIn.Provider value={{ LoggedIn, setLoggedIn }}>
                <Reducer.Provider value={{ user, userDispatch }}>
                    <Provider store={store}>
                        <RouterProvider router={Router} />
                    </Provider>
                </Reducer.Provider>
            </IsLoggedIn.Provider>
        </ThemeProvider>
    </>)
}
export default App
