package com.todo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // Avoids conflict with reserved SQL keyword
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;
}
