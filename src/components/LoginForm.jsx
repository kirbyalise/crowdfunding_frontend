import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js"
import useAuth from "../hooks/use-auth.js";

function LoginForm() {
const navigate = useNavigate();
const {auth, setAuth}= useAuth();

  const [credentials, setCredentials] = useState({
      username: "",
      password: "",
  });

  const handleChange = (event) => {
      const { id, value } = event.target;
      setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [id]: value,
      }));
  };
  const handleSubmit = (event) => {
      event.preventDefault();
      if (credentials.username && credentials.password) {
          postLogin(
              credentials.username,
              credentials.password
          ).then((response) => {
            const isSuperUser = response.email === 'kirby.alise@hotmail.com';
            
            window.localStorage.setItem("token", response.token);
            window.localStorage.setItem("user_id", response.user_id);
            window.localStorage.setItem("is_superuser", String(isSuperUser));
            
            setAuth({
                token: response.token,
                user_id: response.user_id,
                is_superuser: isSuperUser
            });
            navigate("/");
          });
      }
  };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>              
              <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  onChange={handleChange}
              />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
        </form>
    );
}

export default LoginForm;