package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM ITEM WHERE resource_id = ?1 AND item_type = ?2  AND is_available = ?3 ")
    int countItems(Integer resource_id, String itemType, boolean isAvailable);

    @Query(nativeQuery = true, value = "SELECT * FROM ITEM WHERE resource_id = ?1 AND item_type = ?2  AND is_available = ?3 LIMIT 1")
    Optional<Item> getItemForTransaction(Integer resource_id, String itemType, boolean isAvailable);

    @Query(nativeQuery = true, value = "SELECT * FROM ITEM WHERE username = ?1 AND item_type = ?2 ")
    Optional<List<Item>> getItemsByUsername(String username, String itemType);

    @Query(nativeQuery = true, value = "SELECT * FROM ITEM WHERE resource_id = ?1 AND serial_number = ?2 ")
    Optional<List<Item>> getItemsBySerialNumber(Integer resource_id, String serialNumber);
}