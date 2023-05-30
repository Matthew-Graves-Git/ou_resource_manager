package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import com.resourcifyproject.resourcify.User;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
