import { Link } from "react-router-dom"

export default ()=>
{
    return <div>
        <Link style={{margin:"5px"}} to="home">Home</Link>
        <Link style={{margin:"5px"}} to="about">About</Link>
    </div>
}