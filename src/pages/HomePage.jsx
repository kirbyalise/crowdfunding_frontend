import { allProjects } from "../data";
import ProjectCard from "../components/ProjectCard";

function HomePage() {return (
    <div>
        {allProjects.map((projectData, key) => {
            return <ProjectCard key={key} projectData={projectData} />;
        })}
    </div>
    );
}
export default HomePage;