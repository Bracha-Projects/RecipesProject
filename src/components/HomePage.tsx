import { createContext, Dispatch, SetStateAction, useState } from "react"

import {
    Button,
    Grid2 as Grid,
} from "@mui/material";
import Login from "./LogIn";

export const IsLoggedIn = createContext<{LoggedIn:boolean;setLoggedIn:Dispatch<SetStateAction<boolean>>}>({ LoggedIn: false, setLoggedIn: () => { } });

const HomePage = () => {
    const [mode, setMode] = useState<'signIn'|'signUp'>('signIn');
    const [LoggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    return(
        <>
            <IsLoggedIn.Provider value={{ LoggedIn, setLoggedIn }}>
                <Grid container>
                    <Grid justifyContent="flex-start" alignItems="flex-start" size={4}>
                        {LoggedIn  ?null:
                        <div style={{display:"flex",alignContent:"flex-start"}}>
                            <Button color="primary" variant="outlined" onClick={() => {setMode('signIn');setShowModal(true)}} >
                                Sign in
                            </Button>
                            <Button  color="primary" variant="outlined" onClick={() => {setMode('signUp');setShowModal(true)}} >
                                Sign up
                            </Button>
                        </div>
                        }
                       {showModal&&<Login state={mode==='signIn'} onClose={() => setShowModal(false)}/>}
                    </Grid>
                </Grid>
            </IsLoggedIn.Provider>
        </>
)};



export default HomePage