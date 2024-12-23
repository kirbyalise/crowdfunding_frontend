import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";  

function HomePage() {
    const { projects } = useProjects();

    return (
        <>
            <div className="page-container">
                <div className="grid-container">
                    {projects.map((projectData, key) => {
                        return <ProjectCard key={key} projectData={projectData} />;
                    })}
                </div>
            </div>
            <Footer />  
        </>
    );
}

export default HomePage;
