import { useEffect, useState } from "react";
import { Project } from './types/Project' // connects to the Project.ts file

function ProjectList({selectedCategories}: {selectedCategories: string[]}) {

    const[projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const[pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    // this gets the data from the API
    useEffect(() => {
        const fetchProjects = async () => {
            const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');


            const response = await fetch(`https://localhost:5000/water/AllProjects?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            setProjects(data.projects)
            setTotalItems(data.totalNumProjects)
            setTotalPages(Math.ceil(totalItems/pageSize));
        };
        fetchProjects();
    }, [pageSize, pageNum, totalItems, selectedCategories]);

    return(
        <>
            {projects.map((p) =>
                <div id='projectCard' className="card" key={p.projectId}>
                    <h3 className="card-title">{p.projectName}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Project Type:</strong> {p.projectType}</li>
                            <li><strong>Regional Program:</strong> {p.projectRegionalProgram}</li>
                            <li><strong>Impact:</strong> {p.projectImpact} Indiviudals Served</li>
                            <li><strong>Project Phase:</strong> {p.projectPhase}</li>
                            <li><strong>Project Status:</strong> {p.projectFunctionalityStatus}</li>
                        </ul>
                    </div>
                </div>
        )}  

        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
        
        {/* builds an array of the number of pages; acts as a for loop */}
        {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === index + 1}>
                {index + 1}
            </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br />
        <label>
            Results per page:
            <select value={pageSize} onChange={(p) => {setPageSize(Number(p.target.value)); setPageNum(1)}}>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
            </select>
        </label>   
        </>
    );
}

export default ProjectList