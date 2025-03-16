import { useEffect, useState } from "react";
import { Project } from './types/Project' // connects to the Project.ts file

function ProjectList() {

    const[projects, setProjects] = useState<Project[]>([]);

    // this gets the data from the API
    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("https://localhost:5000/water/AllProjects");
            const data = await response.json();
            setProjects(data)
        };
        fetchProjects();
    }, []);

    return(
        <>
            <h1>Water Projects:</h1>
            <br />
            {projects.map((p) =>
                <div id='projectCard'>
                    <h3>{p.projectName}</h3>

                    <ul>
                        <li>Project Type: {p.projectType}</li>
                        <li>Regional Program: {p.projectRegionalProgram}</li>
                        <li>Impact: {p.projectImpact} Indiviudals Served</li>
                        <li>Project Phase: {p.projectPhase}</li>
                        <li>Project Status: {p.projectFunctionalityStatus}</li>
                    </ul>
                </div>
        )}        
        </>
    );
}

export default ProjectList