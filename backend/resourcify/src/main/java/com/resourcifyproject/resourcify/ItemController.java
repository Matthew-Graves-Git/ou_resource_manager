package com.resourcifyproject.resourcify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ResourceRepository resourceRepository;
/*
    @GetMapping("/borrowing/{resourceId}")
    public ResponseEntity<Integer> getNumAvailableBorrowing(@PathVariable Integer resourceId) {
        Optional<Resource> resourceOptional = resourceRepository.findById(resourceId);
        if (!resourceOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        int count = itemService.getNumAvailableBorrowing(resourceOptional.get());
        return ResponseEntity.ok(count);
    }

    @GetMapping("/sale/{resourceId}")
    public ResponseEntity<Integer> getNumAvailableSale(@PathVariable Integer resourceId) {
        Optional<Resource> resourceOptional = resourceRepository.findById(resourceId);
        if (!resourceOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        int count = itemService.getNumAvailableSale(resourceOptional.get());
        return ResponseEntity.ok(count);
    }
*/
    @GetMapping("/borrowed/{username}")
    public ResponseEntity<List<Item>> getBorrowedItems(@PathVariable String username) {
        List<Item> items = itemService.getBorrowedItems(username);
        return ResponseEntity.ok(items);
    }


}