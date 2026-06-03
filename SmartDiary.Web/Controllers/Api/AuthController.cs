using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartDiary.Web.DTOs;
using SmartDiary.Web.Models;
using SmartDiary.Web.Services;

namespace SmartDiary.Web.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtService _jwtService;

        public AuthController(
            UserManager<User> userManager,
            JwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (model.Password != model.Password2)
                return BadRequest("Пароли не совпадают");

            var user = new User
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result =
                await _userManager.CreateAsync(
                    user,
                    model.Password
                );

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new
            {
                message = "Регистрация успешна"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user =
                await _userManager.FindByNameAsync(
                    model.Username
                );

            if (user == null)
                return Unauthorized();

            var valid =
                await _userManager.CheckPasswordAsync(
                    user,
                    model.Password
                );

            if (!valid)
                return Unauthorized();

            var accessToken =
                _jwtService.GenerateAccessToken(user);

            var refreshToken =
                _jwtService.GenerateRefreshToken();

            return Ok(new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Username = user.UserName!,
                Email = user.Email!
            });



        }
    }
}