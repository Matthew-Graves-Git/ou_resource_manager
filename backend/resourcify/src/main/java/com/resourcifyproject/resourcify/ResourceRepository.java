package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM RESOURCE WHERE resource_id = ?1 ")
    Optional<Resource> findById(Integer resourceId);

    @Query(nativeQuery = true, value = "SELECT * FROM RESOURCE WHERE resource_category = ?1 AND resource_id  NOT IN ?2")
    Optional<List<Resource>> getResourcesExceptCart(String resourceCategory, List<String> cart);

    @Query(nativeQuery = true, value = "SELECT * FROM RESOURCE WHERE resource_category = ?1")
    Optional<List<Resource>> getResources(String resourceCategory);

    @Query(nativeQuery = true, value = "SELECT * FROM RESOURCE WHERE resource_id IN ?1 ")
    Optional<List<Resource>> getResourcesCart(List<String> cart);

}