import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchData } from '../redux/RecipesSlice';
import { AddDispatch, StoreType } from '../redux/Store';
import { Box, Paper, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';


export default () => {

    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<AddDispatch>();
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    return (
        <>
            <Outlet />
            <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding={2}
                border={"2px solid primary"}
            >
            </Box>
            <Box
                display="flex"
                textAlign="center"
                flexDirection="column"
                alignItems="flex-end"
                padding={2}
                color="primary"
                width="300px"
                overflow="auto"
                border={"2px solid primary"}
            >
               
                <Paper elevation={3} style={{ padding: '16px', width: '100%', maxWidth: '250px' }}>
                <Typography variant="h6" style={{ marginBottom: '16px', textAlign: 'center',color: '#4caf50' }}>
                    Recipes List
                </Typography>
                    {recipesList.map(r => (
                        <Link
                            key={r.id}
                            to={`${r.id}`}
                            style={{
                                textDecoration: 'none',
                                color: '#4caf50',
                                marginBottom: '8px',
                                borderBottom: '1px solid #4caf50',
                                paddingBottom: '4px',
                                display: 'block',
                            }}
                        >
                            <Typography variant="body1">
                                {r.title}
                            </Typography>
                        </Link>
                    ))}
                </Paper>
            </Box>
        </>
    );
};
