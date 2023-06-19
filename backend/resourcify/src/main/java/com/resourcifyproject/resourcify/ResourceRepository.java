package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    Optional<Resource> findById(Integer resourceId);
    @Query(nativeQuery = true, value = "SELECT ALL FROM RESOURCE WHERE resource_category = ?1 ")
    Optional<List<Resource>> findByResourceCategory(ResourceCategory resourceCategory);

    //@Query("SELECT r FROM Resource r WHERE r.resourceCategory = :category")
}