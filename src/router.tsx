import HomePage from './components/HomePage';
import UserUpdateForm from './components/UserUpdateForm';
import Login from './components/LogIn';
import LetterAvatars from './components/UserAvatar';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import RecipesList from './components/RecipesList';
import RecipeDetails from './components/RecipeDetails';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: 'homePage', element: <HomePage /> },
            { path: 'update', element: <UserUpdateForm /> },
            { path: 'avatar', element: <LetterAvatars /> },
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'navBar', element: <NavBar /> },
            {
                path: 'recipes', element: <RecipesList />, children: [
                    { path: ':recipeId', element: <RecipeDetails /> },
                ]
            },
        ]
    }
])
