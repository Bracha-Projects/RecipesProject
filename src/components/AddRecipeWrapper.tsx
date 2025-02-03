import { useDispatch } from "react-redux";
import { AddDispatch } from "../redux/Store";
import { addRecipe, fetchData, Recipe } from "../redux/RecipesSlice";
import AddRecipe from "./AddRecipe";

export const AddRecipeWrapper = () => {
    const dispatch = useDispatch<AddDispatch>();    
    const addToList = (recipe:Recipe) => {        
        dispatch(addRecipe(recipe));
        dispatch(fetchData())
    };

    return <AddRecipe addToList={addToList} />;
};