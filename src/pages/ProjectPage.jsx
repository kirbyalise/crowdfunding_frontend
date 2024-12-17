import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserCircle2, CircleDollarSign, Calendar } from 'lucide-react'; // Changed icons import
import useProject from "../hooks/use-project";
import useAuth from "../hooks/use-auth";
import UpdateProjectForm from "../components/UpdateProjectForm";
import deleteProject from "../api/delete-project";

function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {auth} = useAuth();
    const { project, isLoading, error } = useProject(id);  

    // Update permission check to include superuser
    const canModifyProject = Boolean(auth.token) && (
        auth.is_superuser || // If superuser, allow all actions
        auth.user_id === String(project?.owner)
    );

    console.log("Auth state:", {
        token: auth.token,
        is_superuser: auth.is_superuser,
        user_id: auth.user_id,
        project_owner: project?.owner
    });
    console.log("Can modify:", canModifyProject);

    function handleDelete(){ 
        if (!canModifyProject) {
            alert("You don't have permission to delete this project");
            return;
        }

        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(project.id)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    alert("Error deleting project: " + error.message);
                });
        }
    }

    if (isLoading) {
        return <p className="loading-message">loading...</p>;
    }
        
    if (error) {
        return <p className="error-message">{error.message}</p>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusText = (isOpen) => {
        return isOpen ? "Active" : "Closed";
    };

// Calculate total pledges and progress
const calculateProjectMetrics = () => {
    // Safely calculate total pledges
    const totalPledges = project.pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0;
    
    // Get goal from project, fallback to 0 if not set
    const projectGoal = project.goal || 0;
    
    // Calculate percentage, ensuring we avoid division by zero
    const progressPercentage = projectGoal > 0 
        ? Math.min((totalPledges / projectGoal) * 100, 100)
        : 0;

    return {
        totalPledges,
        projectGoal,
        progressPercentage
    };
};

const { totalPledges, projectGoal, progressPercentage } = calculateProjectMetrics();
const pledgeLink=`/pledge/${project.id}`;
    return (
        <div className="page-container">
            <div className="project-card">

                {/* Project Header */}
                <div className="project-header">
                    <h1 className="project-title">{project.title}</h1>
                </div>

                                {/* Project Image */}
                                {project.image && (
                    <div className="project-image-container">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="project-image"
                        />
                    </div>
                
                )}

                {/* Funding Progress */}
                <div className="funding-section">
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{width: `${progressPercentage}%`}}
                            ></div>
                        </div>
                        <div className="funding-stats">
                            <span>${totalPledges.toLocaleString()} raised</span>
                            <span>${projectGoal.toLocaleString()} goal</span>
                        </div>
                    </div>

                    {/* Project Stats */}
                    <div className="stats-grid">
                        <div className="stat-item">
                            <UserCircle2 className="stat-icon" />
                            <span className="stat-value">{project.pledges.length}</span>
                            <span className="stat-label">Backers</span>
                        </div>
                        <div className="stat-item">
                            <CircleDollarSign className="stat-icon" />
                            <span className="stat-value">${projectGoal.toLocaleString()}</span>
                            <span className="stat-label">Goal</span>
                        </div>
                        <div className="stat-item">
                            <Calendar className="stat-icon" />
                            <span className="stat-value">{formatDate(project.date_created)}</span>
                            <span className="stat-label">Created</span>
                        </div>
                    </div>

                    <Link to={pledgeLink}>
                    <button>Make a Pledge</button></Link>

                {/* Project Description */}
                <div className="project-description-container">
                    <p className="project-description">
                        {project.description || "Support this amazing project!"}
                    </p>
                </div>

                    {/* Pledges Section */}
                    <div className="pledges-section">
                        <h3 className="section-title">Recent Pledges</h3>
                        <ul className="pledges-list">
                            {project.pledges.map((pledgeData, key) => (
                                <li key={key} className="pledge-item">
                                    <span className="pledge-amount">
                                        ${pledgeData.amount.toLocaleString()}
                                    </span>
                                    <span className="pledge-supporter">
                                        from {pledgeData.supporter}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admin Controls - Only show if user has permission */}
                    {canModifyProject && (
                        <div className="admin-controls">
                            <UpdateProjectForm project={project} />
                            <div className="delete-button-container">
                                <button 
                                    onClick={handleDelete} 
                                    className="delete-button"
                                >
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;