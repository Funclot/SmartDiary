using Microsoft.AspNetCore.Mvc;

namespace SmartDiary.Web.Controllers
{
    public class TagController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
