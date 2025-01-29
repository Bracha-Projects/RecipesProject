import { createContext, Dispatch, SetStateAction, useState } from "react"

import {
    Box,
    Button,
    Card,
    Container,
} from "@mui/material";
import Login from "./LogIn";
import UserAvatar from "./UserAvatar";
import UserUpdateForm from "./UserUpdateForm";

export const IsLoggedIn = createContext<{ LoggedIn: boolean; setLoggedIn: Dispatch<SetStateAction<boolean>> }>({ LoggedIn: false, setLoggedIn: () => { } });

const HomePage = () => {
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [LoggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <IsLoggedIn.Provider value={{ LoggedIn, setLoggedIn }}>
                <Container maxWidth="lg" >
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        gap={1}
                    >
                        {LoggedIn ? <></> : <>
                            <Box >
                                <Button color="primary" variant="contained" onClick={() => { setMode('signIn'); setLoggedIn(true); setShowModal(true) }} >
                                    Sign in
                                </Button>
                            </Box>
                            <Box >
                                <Button color="primary" variant="contained" onClick={() => { setMode('signUp'); setLoggedIn(true); setShowModal(true) }}>
                                    Sign up
                                </Button>
                            </Box>
                        </>
                        }
                        {LoggedIn && showModal && <Login state={mode === 'signIn'} Close={() => setShowModal(false)} showModal={showModal} />}
                        {LoggedIn && !showModal && <UserAvatar></UserAvatar>}
                        {LoggedIn && !showModal && <UserUpdateForm></UserUpdateForm>}
                    </Box>
                </Container>
            </IsLoggedIn.Provider>
        </>
    )
};



export default HomePage