import { createContext } from "react";
import HomePage from "./HomePage"
import {Outlet} from "react-router"
import { User } from "./user";
import useReduser from "./reduser";
import NavBar from "./navBar";

export const url = 'http://localhost:3000/api/user'
export const Reducer = createContext<{
  user: User; 
  userDispatch: React.Dispatch<any>;
}>({
  user: {email:'', password:''},
  userDispatch: () => {}
});
export default ()=>
{
    const {user,userDispatch} = useReduser()
    return(
        < div style={{width:"90vw",height:"80vh"}}>
        <Reducer.Provider value={{user,userDispatch}}>
        <header style={{display:"flex",justifyContent:"space-between"}}>
            <HomePage></HomePage>
            <NavBar></NavBar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        </Reducer.Provider>
        </div>
        
    )
}