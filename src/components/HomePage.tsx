import { useContext, useState } from "react"

import {
    Box,
    Button,
    Container,
} from "@mui/material";
import Login from "./LogIn";
import UserAvatar from "./UserAvatar";
import UserUpdateForm from "./UserUpdateForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "./Error";
import { StoreType } from "../redux/Store";
import { IsLoggedIn } from "../App";

const HomePage = () => {
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [showModal, setShowModal] = useState(false);
    const { LoggedIn, setLoggedIn } = useContext(IsLoggedIn);
    const [updateForm, setUpdateForm] = useState(false);
    const error = useSelector((state: StoreType) => state.ErrorMessage.errorMessage); 
    const navigate = useNavigate();
    return (
        <>
        {error && <Error></Error>}
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
                    {LoggedIn && !showModal && <Box>
                         <Button color="primary" variant="contained" onClick={() => { setLoggedIn(false);navigate('/') }}>Sign Out</Button>
                    </Box>}
                    {LoggedIn && !showModal && <Box>
                         <Button color="primary" variant="contained" onClick={() => { setUpdateForm(true) }}>Update</Button>
                    </Box>}
                    {updateForm && <UserUpdateForm updateForm={updateForm} closeForm={()=>{setUpdateForm(false)}}></UserUpdateForm>}
                </Box>
            </Container>
        </>
    )
};

export default HomePage