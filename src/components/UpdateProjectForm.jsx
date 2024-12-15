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
        auth.email === 'kirby.alise@hotmail.com' || 
        auth.is_superuser === true || 
        String(project?.owner) === String(auth.user_id)
    );

    const [projectdata, setprojectdata] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image,
        creator_name: project.creator_name || ''
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
        if (!canEdit) {
            alert("You don't have permission to edit this project");
            return;
        }
        
        if (projectdata.title && projectdata.description && projectdata.goal && projectdata.image) {
            putProject(
                projectdata.title,
                projectdata.description, 
                projectdata.goal, 
                projectdata.image, 
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
                value={projectdata.title}
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="description">Project Description:</label>
                <AutoResizeTextArea
                    id="description"
                    value={projectdata.description}
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

            <div>
                <label htmlFor="creator_name">Created By:</label>
                <input
                    type="text"
                    id="creator_name"
                    placeholder="Enter creator's name"
                    value={projectdata.creator_name}
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