import { Link } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function NavBar() {
  const {auth, setAuth}= useAuth();
  
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("is_superuser");
    setAuth({
      token: null,
      user_id: null,
      is_superuser: false
    });
  }

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>      
      <Link to= "/newproject">Create a Funding Project</Link>      
      <Link to= "/pledge">Make a Pledge</Link>
      {!auth.token ? <Link to= "/users">Sign Up </Link> : null}
      {auth.token ? <Link to="/" onClick={handleLogout}>Logout</Link> : <Link to="/login">Log In</Link>}
    </nav>
  );
}

export default NavBar;



