import { useState } from "react";
import { useNavigate } from "react-router-dom";

import putProject from "../api/put-project.js"

function UpdateProjectForm(props) {
    const {project} = props;
const navigate = useNavigate();
const [projectdata, setprojectdata] = useState({
    title: project.title,
    description: project.description,
    goal: project.goal,
    image: project.image,
});

const handleChange = (event) => {
    const { id, value } = event.target;
        setprojectdata((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
};

const handleSubmit = (event) => {
    event.preventDefault();
        if (projectdata.title && projectdata.description && projectdata.goal && projectdata.image) {
            putProject(
            projectdata.title,
            projectdata.description, 
            projectdata.goal, 
            projectdata.image, 
            project.id
        ).then((response) => {
            navigate("/");
        });
    }
};

    return (
        <form>
            <div>
                <label htmlFor="Title">Title:</label>              
                <input
                type="text"
                id="title"
                placeholder="Enter Project Title"
                value={projectdata.title}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="description">Project Description:</label>
                <input
                type="description"
                id="description"
                placeholder="Description"
                value={projectdata.description}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="goal">Goal:</label>
                <input
                type="goal"
                id="goal"
                placeholder="$"
                value={projectdata.goal}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                type="text"
                id="image"
                placeholder="Project Image URL"
                value={projectdata.image}
                onChange={handleChange}
            />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default UpdateProjectForm;