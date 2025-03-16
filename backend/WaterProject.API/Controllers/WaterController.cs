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
        public IEnumerable<Project> GetProjects()
        {
            var something = _waterContext.Projects.ToList();
            return something;
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }
    }
}
