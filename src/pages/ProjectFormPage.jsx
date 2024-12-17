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
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            // Set the image name in projectData
            setProjectData(prev => ({
                ...prev,
                image: file.name
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (projectData.title && projectData.description && projectData.goal) {
            try {
                // If there's a file, upload it first
                let imageUrl = projectData.image;
                if (imageFile) {
                    const formData = new FormData();
                    formData.append('image', imageFile);
                    // You'll need to create an endpoint for image upload
                    const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload-image/`, {
                        method: 'POST',
                        body: formData
                    });
                    if (!uploadResponse.ok) throw new Error('Failed to upload image');
                    const uploadData = await uploadResponse.json();
                    imageUrl = uploadData.url;
                }

                // Then create the project with the image URL
                await postProject(
                    projectData.title,
                    projectData.description,
                    projectData.goal,
                    imageUrl,
                );
                navigate("/");
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("Please fill in all required fields");
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

            <div className="image-upload-container">
                <label htmlFor="image">Project Image:</label>
                <div className="image-input-group">
                    <input
                        type="file"
                        id="image-file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input"
                    />
                    <p className="or-divider">OR</p>
                    <input
                        type="text"
                        id="image"
                        placeholder="Enter Image URL"
                        value={projectData.image}
                        onChange={handleChange}
                        className="url-input"
                    />
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default ProjectFormPage;