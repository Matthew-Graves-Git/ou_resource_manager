package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    Optional<Resource> findById(Integer resourceId);
}