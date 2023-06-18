package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByUsernameAndItemtype(String username, ItemType itemType);
    int countItems(Resource resource, ItemType itemType, boolean isAvailable);
    //Need to make this work as JPA custom query
}
