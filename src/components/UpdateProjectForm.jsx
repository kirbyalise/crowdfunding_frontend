import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";

import putProject from "../api/put-project.js"
import AutoResizeTextArea from './AutoResizeTextArea';

function UpdateProjectForm(props) {
    const {project} = props;
    const navigate = useNavigate();
    const {auth} = useAuth();


    const canEdit = Boolean(auth.token) && (
        auth.username === 'superkirby' || // Superuser check
        Number(auth.user_id) === Number(project?.owner) // Project owner check
    );

    const [projectData, setProjectData] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image,
        creator_name: project.creator_name || ''
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
            setProjectData((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
            }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!canEdit) {
            alert("You don't have permission to edit this project");
            return;
        }
        
        if (projectData.title && projectData.description && projectData.goal && projectData.image) {
            putProject(
                projectData.title,
                projectData.description, 
                projectData.goal, 
                projectData.image, 
                project.id
            ).then((response) => {
                navigate("/");
            }).catch(error => {
                alert("Error updating project: " + error.message);
            });
        }
    };

    if (!canEdit) return null;

    return (
        <form>
            <div>
                <label htmlFor="Title">Title:</label>              
                <input
                type="text"
                id="title"
                placeholder="Enter Project Title"
                value={projectData.title}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="description">Project Description:</label>
                <AutoResizeTextArea
                    id="description"
                    value={projectData.description}
                    onChange={handleChange}
                    placeholder="Project description"
                />
            </div>

            <div>
                <label htmlFor="goal">Goal:</label>
                <input
                type="goal"
                id="goal"
                placeholder="$"
                value={projectData.goal}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="image">Image:</label>
                <input
                type="text"
                id="image"
                placeholder="Project Image URL"
                value={projectData.image}
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