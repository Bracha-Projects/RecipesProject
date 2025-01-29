import { Box, colors, Divider } from "@mui/material"
import { Link } from "react-router-dom"

export default () => {
    const LinkColor = "white";
    return (
        <Box display="flex" alignItems="center">
            <Link style={{ margin: "5px", textDecoration: "none" ,color:LinkColor}} to="home">Home</Link>
            <Divider orientation="vertical" flexItem sx={{backgroundColor:LinkColor}}/>
            <Link style={{ margin: "5px", textDecoration: "none",color:LinkColor }} to="about">About</Link>
            <Divider orientation="vertical" flexItem sx={{backgroundColor:LinkColor}}/>
            <Link style={{ margin: "5px", textDecoration: "none" ,color:LinkColor}} to="recipes">Recipes</Link>
        </Box>)
}
