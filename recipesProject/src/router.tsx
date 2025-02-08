import HomePage from './components/HomePage';
import LetterAvatars from './components/UserAvatar';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import RecipeDetails from './components/RecipeDetails';
import RecipesList from './components/RecipesList';
import { AddRecipeWrapper } from './components/AddRecipeWrapper';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: 'homePage', element: <HomePage /> },
            { path: 'avatar', element: <LetterAvatars /> },
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'navBar', element: <NavBar /> },
            {
                path: 'recipes', element: <RecipesList />, children: [
                    { path: ':recipeId', element: <RecipeDetails /> },
                    { path: 'addRecipe', element: <AddRecipeWrapper />}]
            },
        ]
    }
])
