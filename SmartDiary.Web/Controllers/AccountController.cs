using Microsoft.AspNetCore.Mvc;

namespace SmartDiary.Web.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
