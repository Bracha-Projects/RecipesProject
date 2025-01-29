import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { addRecipe, fetchData } from '../recipes/RecipesSlice';
import { AddDispatch, StoreType } from '../recipes/Store';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default () => {
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<AddDispatch>();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                width="100%"
                height="100vh" // Full height of the viewport
                padding={2} // Optional padding
            >
                {recipesList.map(r => <Link  key={r.id} to={`/recipes/${r.id}`}>
                <Button key={r.id}>{r.title}</Button>
                </Link>)}
            </Box>
        </>
    );
};
