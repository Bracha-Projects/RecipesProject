import { Box,Divider } from "@mui/material"
import { useContext } from "react";
import { Link } from "react-router-dom"
import { IsLoggedIn } from "../App";

export default () => {
    const LinkColor = "black";
    const { LoggedIn } = useContext(IsLoggedIn);
    return (
        <Box
            display="flex"
            alignItems="center"
            style={{ whiteSpace: 'nowrap' }} // Prevents text wrapping
        >
            <Link style={{ margin: "5px", textDecoration: "none", color: LinkColor }} to="home">Home</Link>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: LinkColor }} />
            <Link style={{ margin: "5px", textDecoration: "none", color: LinkColor }} to="about">About</Link>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: LinkColor }} />
            <Link style={{ margin: "5px", textDecoration: "none", color: LinkColor }} to="recipes">Recipes</Link>
            {LoggedIn && <Divider orientation="vertical" flexItem sx={{ backgroundColor: LinkColor }} />}
            {LoggedIn && <Link style={{ margin: "5px", textDecoration: "none", color: LinkColor }} to="recipes/addRecipe">Add-Recipe</Link>}
        </Box>
    )
}
