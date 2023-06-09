package com.resourcifyproject.resourcify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;
/*
    public int getNumAvailableBorrowing(Resource resource) {
        return itemRepository.countItemsByResourceItemtypeAndAvail(resource, ItemType.BORROW, true);
    }

    public int getNumAvailableSale(Resource resource) {
        return itemRepository.countItemsByResourceItemtypeAndAvail(resource, ItemType.SALE, true);
    }
*/
    public List<Item> getBorrowedItems(String username) throws ResourceNotFoundException {
        List<Item> borrowedItems = itemRepository.findByUsernameAndItemtype(username, ItemType.BORROW);
        if(borrowedItems.isEmpty()){
            throw new ResourceNotFoundException("You are not currently borrowing any items!");
        }
        return borrowedItems;
    }

    public List<Item> getPurchasedItems(String username) throws ResourceNotFoundException {
        List<Item> purchasedItems = itemRepository.findByUsernameAndItemtype(username, ItemType.SALE);
        if(purchasedItems.isEmpty()){
            throw new ResourceNotFoundException("You have not purchased any items!");
        }
        return purchasedItems;
    }
}
