using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase // general controller
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }

        // public WaterController(WaterDbContext temp) => _waterContext = temp; (lambda function)

        [HttpGet("AllProjects")] // routing to get to this action
        public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~~~COOKIE~~~~~~\n" + favProjType);
            
            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });
            
            var query = _waterContext.Projects.AsQueryable();
            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }
            
            var totalNumProjects = query.Count();

            
            var something = query
                .Skip((pageNum - 1) * pageHowMany) // skip number of records
                .Take(pageHowMany) // display the number you want
                .ToList();
            
            var someObject = new
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
            };
            return Ok(someObject);
        }
        
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            return Ok(projectTypes);
        }

        // Add a project to the database
        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject) 
        {
            _waterContext.Projects.Add(newProject);
            _waterContext.SaveChanges();
            return Ok(newProject);
        }

        // Edit a project in the database
        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject) 
        {
            var existingProject = _waterContext.Projects.Find(projectId);
            if (existingProject == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

            _waterContext.Projects.Update(existingProject);
            _waterContext.SaveChanges();
            return Ok(existingProject);
        }

        // Delete a project in the database
        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var project = _waterContext.Projects.Find(projectId);

            if (project == null) 
            {
                return NotFound(new { message = "Project not found" });
            }

            _waterContext.Projects.Remove(project);
            _waterContext.SaveChanges();

            return NoContent();
        }
    }
}
