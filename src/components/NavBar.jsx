import { Link } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function NavBar() {
  const {auth, setAuth}= useAuth();
  const handleLogout=()=>{
    window.localStorage.removeItem("token");
            setAuth({
                token:null
            })
  }
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {auth.token ? <Link to= "/"onClick={handleLogout}>Logout</Link>: <Link to="/login">Log In</Link>}
      {!auth.token ? <Link to= "/users">Sign Up </Link> : null}
      <Link to= "/newproject">Create a Funding Project</Link>
      <Link to= "/pledge">Make a Pledge</Link>
    </nav>
  );
}

export default NavBar;



