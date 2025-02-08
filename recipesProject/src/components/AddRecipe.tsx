import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { array, object, string } from 'yup';
import { useContext, useState } from 'react';
import { Recipe } from "../redux/RecipesSlice";
import { Box, Button, Grid2, List, ListItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Reducer } from "../App";

const schema = object({
    title: string().required(),
    description: string().required(),
    ingredients: array().of(string()),
    instructions: array().of(string()),
}).required();

const HookForm = ({ addToList }: { addToList: (recipe: Recipe) => void }) => {
    const [instruction, setInstruction] = useState('');
    const [instructions, setInstructions] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const addInstruction = () => {
        if (instruction) {
            setInstructions([...instructions, instruction]);
            setInstruction(''); 
        }
    };

    const addIngredient = () => {
        if (ingredient) {
            setIngredients([...ingredients, ingredient]);
            setIngredient(''); 
        }
    }
    const { user } = useContext(Reducer);
    const onSubmit = (data: Recipe) => {
        addToList(
            {
                ...data,
                authorId: user.id,
                instructions: instructions.length > 0 ? instructions : [], // Ensure instructions is included
                ingredients: ingredients.length > 0 ? ingredients : [] // Ensure ingredients is included
            }
        );
        reset();
        setInstructions([]); 
        setIngredients([]); 
        navigate('/recipes'); 
    };

    return (
        <>
           <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: 2,
                maxWidth: '400px',
                margin: 'auto'
            }}
        >
            <TextField
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
                fullWidth
                margin="normal"
            />
            <Box display="flex" alignItems="center" marginTop={2}>
                <TextField
                    label="Ingredients"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ marginRight: 1 }} // Add some space between TextField and Button
                />
                <Button variant="contained" onClick={addIngredient}>Add Ingredient</Button>
            </Box>
            <List>
                {ingredients.map((inst, index) => (
                    <ListItem key={index}>
                        <Typography>{inst}</Typography>
                    </ListItem>
                ))}
            </List>
            <Box display="flex" alignItems="center" marginTop={2}>
                <TextField
                    label="Instructions"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ marginRight: 1 }} // Add some space between TextField and Button
                />
                <Button variant="contained" onClick={addInstruction}>Add Instruction</Button>
            </Box>
            <List>
                {instructions.map((inst, index) => (
                    <ListItem key={index}>
                        <Typography>{inst}</Typography>
                    </ListItem>
                ))}
            </List>
            <Grid2 container justifyContent="center" marginTop={2}>
                <Button type="submit" variant="contained" color="primary">Send</Button>
            </Grid2>
        </Box>
        </>
    );
};
export default HookForm;
