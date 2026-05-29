using Microsoft.AspNetCore.Mvc;

namespace SmartDiary.Web.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
