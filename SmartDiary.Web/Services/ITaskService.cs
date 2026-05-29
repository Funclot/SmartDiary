using SmartDiary.Web.Models;
namespace SmartDiary.Web.Services;
public interface ITaskService
{
    Task<IEnumerable<Tasks>> GetUserTasksAsync(string userId);
    Task<Tasks?> GetTaskByIdAsync(int id, string userId);
    Task<Tasks> CreateTaskAsync(Tasks task, string userId, int[] selectedTags);
    Task<Tasks?> UpdateTaskAsync(Tasks task, string userId, int[] selectedTags);
    Task<bool> DeleteTaskAsync(int id, string userId);
}
