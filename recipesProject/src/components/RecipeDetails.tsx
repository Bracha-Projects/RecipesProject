import { useSelector } from "react-redux";
import { StoreType } from "../redux/Store";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default () =>
{
    const {recipeId} = useParams();
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);
    const recipe = recipesList.find(r => r.id === (recipeId ? +recipeId : 0));
    return(<>
         <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="flex-start"  
            padding={2}
            bgcolor="background.default"
            >
            <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    {recipe?.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Recipe ID: {recipe?.id}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Description
                </Typography>
                <Typography variant="body1" paragraph>
                    {recipe?.description}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Ingredients
                </Typography>
                <Typography variant="body1" paragraph>
                    {recipe?.ingredients.map(recipe =><div>{recipe}</div>)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Instructions
                </Typography>
                <Typography variant="body1" paragraph>
                    {recipe?.instructions}
                </Typography>
             </Paper>
        </Box>
    </>)
}