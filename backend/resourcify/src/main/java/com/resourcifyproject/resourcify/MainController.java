package com.resourcifyproject.resourcify;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.lang.Math;



@Controller
@CrossOrigin
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class MainController {
    @Autowired // This means to get the bean called userRepository which is auto-generated by Spring, we will use it to handle the data
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
        if (userRepository.findByUsername(payload.get("username").textValue()).isPresent()){
            return "User already Exists";
        }
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
    @GetMapping(path="/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public @ResponseBody Optional<User> getAllUsers(HttpServletRequest request) {
        // This returns a JSON or XML with the users
        return userRepository.findByUsername(request.getRemoteUser());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/get")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  // is this necessary?
    public @ResponseBody List<Resource> getAllResources(HttpServletRequest request) { //actually need parameter here?
        return resourcerepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/get/borrow")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  // is this necessary?
    public @ResponseBody int getAvailBorrow(HttpServletRequest request) { //Parameter sufficient for holding desired Resource & itemType ?

        return //int from itemrepository method either thru ItemService method, or delete those methods and just do it here
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/get/sale")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  // is this necessary?
    public @ResponseBody int getAvailPurchase(HttpServletRequest request) { //Parameter sufficient for holding desired Resource & itemType ?

        return //int from itemrepository method either thru ItemService method, or delete those methods and just do it here
    }


    //can we just delete this?
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping(path="items/add")
//    public @ResponseBody String addNewItem(@RequestBody JsonNode payload) {
//        Inventory newItem = new Inventory();
//        newItem.setName(payload.get("name").textValue());
//        newItem.setModel(payload.get("model").textValue());
//        newItem.setPrice(Integer.parseInt(payload.get("price").textValue()));
//        newItem.setStock(Integer.parseInt(payload.get("stock").textValue()));
//        newItem.setImage(payload.get("image").textValue());
//        newItem.setType(payload.get("type").textValue());
//        inventoryRepository.save(newItem);
//        return "Saved";
//    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/resource") // Map ONLY POST Requests
    public @ResponseBody String addNewResource (@RequestBody JsonNode payload)
    {
        Resource r = new Resource();
        r.setResourcecategory(payload.get("resourcecategory").textValue());
        r.setName(payload.get("name").textValue());
        resourcerepository.save(r);
        return "Saved resource";
    }
    @PostMapping(path="/add/item") // Map ONLY POST Requests
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
    @PostMapping(path="/add/funds")
    public @ResponseBody String addFunds (@RequestBody JsonNode payload) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(payload.get("username").textValue()).get();
        user.setAvailablefunds( user.getAvailablefunds() + payload.get("funds").floatValue() );

        return "success message";
    }
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public class ForbiddenException extends RuntimeException {}

    @GetMapping(path="/confirm")
    public @ResponseBody String isAdmin (HttpServletRequest request)
    {
        User user = userRepository.findByUsername(request.getRemoteUser()).get();
        if(user != null) {
            if ((user.getRole()) == Role.valueOf("ADMIN")) {
                return "Success";
            }
        }
        throw new ForbiddenException();

    }
}