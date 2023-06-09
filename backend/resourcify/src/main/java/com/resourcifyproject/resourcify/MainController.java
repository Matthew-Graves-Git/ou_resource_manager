package com.resourcifyproject.resourcify;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.resourcifyproject.resourcify.ResourceCategory.LAPTOP;

@Controller
@CrossOrigin
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class MainController {
    @Autowired // bean called userRepository is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;
    @Autowired
    private ResourceRepository resourcerepository;
    @Autowired
    private ItemRepository itemrepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser (@RequestBody JsonNode payload)
    {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        n.setRole(payload.get("role").textValue());
        n.setUsername(payload.get("username").textValue());
        n.setPassword(payload.get("password").textValue());
        n.setPassword(passwordEncoder.encode(n.getPassword()));
        n.setLastname(payload.get("lastname").textValue());
        n.setFirstname(payload.get("firstname").textValue());
        userRepository.save(n);
        return "Saved";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/addresource") // Map ONLY POST Requests
    public @ResponseBody String addNewResource (@RequestBody JsonNode payload)
    {
        Resource r = new Resource();
        r.setResourcecategory(payload.get("resourcecategory").textValue());
        r.setName(payload.get("name").textValue());
        resourcerepository.save(r);
        return "Saved resource";
    }
    @PostMapping(path="/additem") // Map ONLY POST Requests
    public @ResponseBody String addNewItem (@RequestBody JsonNode payload)
    {
        Resource jank = resourcerepository.findById(1).get();
        Item i = new Item();
        i.setResource(jank);
        i.setAvailable(true);
        i.setItemtype(ItemType.SALE);
        i.setTransactionPrice(49.99F);
        itemrepository.save(i);
        return "Saved item";
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
}