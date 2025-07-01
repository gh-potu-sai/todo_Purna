package com.todo.repository;

import com.todo.model.Task;
import com.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user); // ✅ This fetches tasks based on the logged-in user
}
