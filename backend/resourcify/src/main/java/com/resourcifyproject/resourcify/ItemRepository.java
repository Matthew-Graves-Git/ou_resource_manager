package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM ITEM WHERE resource_id = ?1 AND itemtype = ?2  AND is_available = ?3 ")
    int countItems(Integer resource_id,Integer itemType, boolean isAvailable);

    @Query(nativeQuery = true, value = "SELECT * FROM ITEM WHERE resource_id = ?1 AND itemtype = ?2  AND is_available = ?3 LIMIT 1")
    Item getItemForTransaction(Integer resource_id,Integer itemType, boolean isAvailable);

    @Query(nativeQuery = true, value = "SELECT * FROM ITEM WHERE username = ?1 AND itemtype = ?2 ")
    List<Item> getItemsByUsername(String username, Integer itemType);
}
