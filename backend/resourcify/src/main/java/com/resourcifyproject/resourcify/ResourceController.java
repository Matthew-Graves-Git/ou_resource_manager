package com.resourcifyproject.resourcify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Adjust this as per your React application's URL
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        List<Resource> resources = resourceRepository.findAll();
        return ResponseEntity.ok(resources);
    }
}