package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    //List<Item> findByUsernameAndItemtype(String username, ItemType itemType);//
    @Query(value = "SELECT COUNT(*) FROM ITEM WHERE RESOURCE = ?1 AND ITEMTYPE = ?2 AND ISAVAILABLE = ?3", nativeQuery = true)
    int countItems(Resource resource, ItemType itemType, boolean isAvailable);
}
