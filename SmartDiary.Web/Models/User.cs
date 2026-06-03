using Microsoft.AspNetCore.Identity;

namespace SmartDiary.Web.Models
{
    public class User : IdentityUser
    {
        public string? Avatar { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? Settings { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public ICollection<Project> Projects { get; set; } = new List<Project>();

        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}