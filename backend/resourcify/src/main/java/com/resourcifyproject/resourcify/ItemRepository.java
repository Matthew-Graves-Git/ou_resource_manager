package com.resourcifyproject.resourcify;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    //List<Item> findByUsernameAndItemtype(String username, ItemType itemType);
//    Optional<Item> findById(Integer item_Id);
    //int countItems(Resource resource, ItemType itemType, boolean isAvailable);
    //Need to make this work as JPA custom query
}
