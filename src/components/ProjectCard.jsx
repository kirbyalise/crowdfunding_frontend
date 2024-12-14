import { Link } from "react-router-dom";
import "./ProjectCard.css"

function ProjectCard({ projectData }) {
    const projectLink = `project/${projectData.id}`;

    return (
        <div className="card">
            <Link to={projectLink}>
                {projectData.image && (
                    <img 
                        src={projectData.image} 
                        alt={projectData.title}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '1rem'
                        }}
                    />
                )}
                <h2>{projectData.title}</h2>
                <p>{projectData.description}</p>
            </Link>
        </div>
    );
}

export default ProjectCard;