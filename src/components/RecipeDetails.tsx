import { useSearchParams } from "react-router-dom"
import RecipesList from "./RecipesList";
import { useSelector } from "react-redux";
import { StoreType } from "../recipes/Store";

export default () =>
{
    const [searchParams] = useSearchParams();
    const id = searchParams.get('recipeId');
    const { recipes: { list: recipesList } } = useSelector((store: StoreType) => store);

    return(<>
    
    </>)
}