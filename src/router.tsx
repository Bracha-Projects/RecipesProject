import HomePage from './components/HomePage';
import UserUpdateForm from './components/UserUpdateForm';
import Login from './components/LogIn';
import NavBar from './components/navBar';
import LetterAvatars from './components/UserAvatar';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/appLayout';
import Home from './components/Home';
import About from './components/About';

export const Router = createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {path:'homePage',element:<HomePage/>},
            {path:'update', element:<UserUpdateForm/>},
            {path:'avatar', element:<LetterAvatars/>},
            {path:'home', element:<Home/>},
            {path:'about', element:<About/>},
            {path:'navBar', element:<NavBar/>},
        ]
    }
])
