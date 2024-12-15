import { Link } from "react-router-dom";
import "./ProjectCard.css"

function ProjectCard({ projectData }) {
    const projectLink = `project/${projectData.id}`;

    // Calculate progress percentage and total raised
    const totalRaised = projectData.total_raised || 0;
    const progressPercentage = projectData.goal > 0 
        ? Math.min((totalRaised / projectData.goal) * 100, 100)
        : 0;

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
                
                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill"
                            style={{width: `${progressPercentage}%`}}
                        ></div>
                    </div>
                    <div className="funding-stats">
                        <span>${totalRaised.toLocaleString()} raised</span>
                        <span>${projectData.goal.toLocaleString()} goal</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard;