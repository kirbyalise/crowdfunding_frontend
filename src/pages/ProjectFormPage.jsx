import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProject from "../api/post-project";
import AutoResizeTextArea from '../components/AutoResizeTextArea';

function ProjectFormPage() {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        owner_username: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (projectData.title && projectData.description && projectData.goal && projectData.image && projectData.owner_username) {
            postProject(
                projectData.title,
                projectData.description,
                projectData.goal,
                projectData.image,
                projectData.owner_username
            ).then((response) => {
                navigate("/");
            });
        } else {
            alert("Please fill in all fields, including creator's name");
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="title">Title:</label>
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

            <div>
                <label htmlFor="owner_username">Created By:</label>
                <input
                    type="text"
                    id="owner_username"
                    placeholder="Enter your name"
                    value={projectData.owner_username}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default ProjectFormPage;