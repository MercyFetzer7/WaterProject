import { useState } from "react";
import WelcomeBand from "../components/WelcomeBand";
import CategoryFilter from "../components/CategoryFilter";
import ProjectList from "../components/ProjectList";
import CartSummary from "../components/CartSummary";

function ProjectsPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    return(
        <div className='container mt-4'>
            <CartSummary />
            <WelcomeBand />
            <br />
            <div className='row'>
                <div className='col-md-3'>
                    <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                </div>
                <div className='col-md-9'>
                    <ProjectList selectedCategories={selectedCategories}/>
                </div>
            </div>
      </div>
    );
}

export default ProjectsPage