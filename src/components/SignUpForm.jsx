// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import postUser from "../api/post-user.js"

// function SignUpForm() {
// const navigate = useNavigate();

//     const [credentials, setCredentials] = useState({
//         username: "",
//         password: "",
//         first_name: "",
//         last_name: "",
//         email: ""
//     });

//     const handleChange = (event) => {
//         const { id, value } = event.target;
//         setCredentials((prevCredentials) => ({
//         ...prevCredentials,
//             [id]: value,
//     }));
// };
//   const handleSubmit = (event) => {
//       event.preventDefault();
//       if (credentials.username && credentials.password) {
//           postUser(
//               credentials.username,
//               credentials.password
//           ).then((response) => {
//             window.localStorage.setItem("token", response.token);
//             navigate("/");
//           });
//       }
//   };

//     return (
//         <form>
//             <div>
//                 <label htmlFor="username">Username:</label>              
//               <input
//                   type="text"
//                   id="username"
//                   placeholder="Enter username"
//                   onChange={handleChange}
//               />
//             </div>
//             <div>
//                 <label htmlFor="password">Password:</label>
//               <input
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//               />
//             </div>
//             <div>
//                 <label htmlFor="first_name">First Name:</label>
//               <input
//                   type="first_name"
//                   id="first_name"
//                   placeholder="First Name"
//                   onChange={handleChange}
//               />
//             </div>
//             <button type="submit" onClick={handleSubmit}>
//                 Sign Up
//             </button>
//         </form>
//     );
// }

// export default SignUpForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUser from "../api/post-user.js";

function SignUpForm() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
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
        const { username, password, first_name, last_name, email } = credentials;

        if (!username || !password || !first_name || !last_name || !email) {
            alert("Please fill in all fields.");
            return;
        }

        postUser(username, password, first_name, last_name, email)
            .then((response) => {
                window.localStorage.setItem("token", response.token);
                navigate("/");
            })
            .catch((error) => {
                console.error("Signup error:", error);
                alert("Failed to sign up. Please try again.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
