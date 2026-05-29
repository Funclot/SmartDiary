using System.ComponentModel.DataAnnotations;
public class LoginViewModel
{
    [Required]
    public string Username { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Display(Name = "Запомнить меня")]
    public bool RememberMe { get; set; }
}
