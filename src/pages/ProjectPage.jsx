import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import UpdateProjectForm from "../components/UpdateProjectForm";
import deleteProject from "../api/delete-project";
import useAuth from "../hooks/use-auth";

function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {auth, setAuth}= useAuth();
    const { project, isLoading, error } = useProject(id);  

    if (isLoading) {
        return (<p>loading...</p>)
    }
        
    if (error) {
        return (<p>{error.message}</p>)
    }

    function handleDelete(){ 
        deleteProject(project.id).then((response) => {
            navigate("/");
        });
    }

    return (
        <div className="page-container">
            <div className="project-details">
                {project.image && (
                    <img 
                        src={project.image} 
                        alt={project.title}
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}
                    />
                )}
                <h2>{project.title}</h2>
                <h3>Created at: {project.date_created}</h3>
                <h3>{`Status: ${project.is_open}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, key) => {
                        return (
                            <li key={key}>
                                {pledgeData.amount} from {pledgeData.supporter}
                            </li>
                        );
                    })}
                </ul>
                {auth.token && (
                    <div>
                        <UpdateProjectForm project={project} />
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectPage;

