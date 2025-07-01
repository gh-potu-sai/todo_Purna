package com.todo.service;

import com.todo.model.Task;
import com.todo.model.User;
import com.todo.repository.TaskRepository;
import com.todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    // ✅ Get all tasks by username
    public List<Task> getTasksByUsername(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepo.findByUser(user);
    }

    // ✅ Create a task and assign it to a user
    public Task createTask(Task task, String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        return taskRepo.save(task);
    }



    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setCompleted(updatedTask.isCompleted());
        task.setPriority(updatedTask.getPriority());

        return taskRepo.save(task); // ✅ MUST RETURN THIS
    }



    // ✅ Delete task
    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    // ✅ Get task by ID
    public Task getTaskById(Long id) {
        return taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
    }
}
