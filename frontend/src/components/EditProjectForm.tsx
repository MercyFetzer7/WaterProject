import { useState } from 'react';
import { Project } from '../types/Project';
import { updateProject } from '../api/ProjectsAPI'
interface EditProjectFormProps {
    project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}
const EditProjectForm = ({ project, onSuccess, onCancel }: EditProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({...project});

  // this updates the formData variable each time the user enters in info from the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stops reloading the page
    await updateProject(formData.projectId, formData);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Project</h2>
      <div className="form-grid">
        <label>
          Project Name:
          <input
            type="text"
            name="projectName" // this has to match the Project.ts file
            value={formData.projectName}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Type:
          <input
            type="text"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          />
        </label>
        <label>
          Regional Program:
          <input
            type="text"
            name="projectRegionalProgram"
            value={formData.projectRegionalProgram}
            onChange={handleChange}
          />
        </label>
        <label>
          Impact:
          <input
            type="number"
            name="projectImpact"
            value={formData.projectImpact}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Phase:
          <input
            type="text"
            name="projectPhase"
            value={formData.projectPhase}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Functionality Status:
          <input
            type="text"
            name="projectFunctionalityStatus"
            value={formData.projectFunctionalityStatus}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Project</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditProjectForm;