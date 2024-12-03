import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to= "/users">Sign Up </Link>
        <Link to= "/newproject">New Project</Link>
        <Link to= "/pledge">Make a Pledge</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;