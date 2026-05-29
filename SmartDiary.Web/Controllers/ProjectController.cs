using Microsoft.AspNetCore.Mvc;

namespace SmartDiary.Web.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
