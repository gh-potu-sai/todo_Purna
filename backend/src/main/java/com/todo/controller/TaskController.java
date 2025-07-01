package com.todo.controller;

import com.todo.model.Task;
import com.todo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    // ✅ GET all tasks for a specific user (via ?username=...)
    @GetMapping
    public List<Task> getTasksForUser(@RequestParam String username) {
        return service.getTasksByUsername(username);
    }

    // ✅ GET a single task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    // ✅ POST (create) a new task for a user
    @PostMapping
    public Task createTask(
        @RequestBody Task task,
        @RequestParam(name = "username", required = true) String username
    ) {
        return service.createTask(task, username);
    }

    // ✅ PUT (update) an existing task — FIXED to return 200 OK with body


    
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task savedTask = service.updateTask(id, updatedTask);
        System.out.println("✅ Updated Task: " + savedTask); // DEBUG: Confirm task returned
        return ResponseEntity.ok(savedTask); // ✅ MUST RETURN TASK OBJECT
    }



    // ✅ DELETE a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
