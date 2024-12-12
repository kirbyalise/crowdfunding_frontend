import { Link, Outlet } from "react-router-dom";
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
    <div>
      <nav>
        <Link to="/">Home</Link>
        {auth.token ? <Link to= "/"onClick={handleLogout}>Logout</Link>: <Link to="/login">Log In</Link>}
        {!auth.token ? <Link to= "/users">Sign Up </Link> : null}
        <Link to= "/newproject">New Project</Link>
        <Link to= "/pledge">Make a Pledge</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;



