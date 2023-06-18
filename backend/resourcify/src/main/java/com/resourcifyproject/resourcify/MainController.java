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

import java.time.LocalDateTime;
import java.util.*;


@Controller
@CrossOrigin
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class MainController {
    @Autowired // This means to get the bean called userRepository which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;

    @Autowired
    private ResourceRepository resourcerepository;

    @Autowired
    private ItemRepository itemRepository;

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

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping(path="/get/borrow")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  // is this necessary?
//    public @ResponseBody int getAvailBorrow(HttpServletRequest request) { //Parameter sufficient for holding desired Resource & itemType ?
//        //CODE FOR GETTING RESOURCE OBJECT FROM DATA CONTAINED IN REQUEST
//        return itemRepository.countItems(resource, ItemType.BORROW, true);
//    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping(path="/get/sale")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")  // is this necessary?
//    public @ResponseBody int getAvailPurchase(HttpServletRequest request) { //Parameter sufficient for holding desired Resource & itemType ?
//        //CODE FOR GETTING RESOURCE OBJECT FROM DATA CONTAINED IN REQUEST
//        return itemRepository.countItems(resource, ItemType.SALE, true);
//    }
//

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
        r.setImage(payload.get("image").textValue());
        r.setModel(payload.get("model").textValue());
        r.setBorrowPrice(Float.parseFloat(payload.get("borrowPrice").textValue()));
        r.setSalePrice(Float.parseFloat(payload.get("salePrice").textValue()));
        r.setDescription(payload.get("desc").textValue());
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
        i.setUsername("");
        i.setTransactionTime(LocalDateTime.now());
        i.setSerialNumber("");
        itemRepository.save(i);
        return "Saved item";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/get/all")
    public @ResponseBody List<Item> getAllItems()
    {
//        Map<String,Object> result = new HashMap<>();
//        ArrayList<Map<String,Object>> a = new ArrayList<>();
//        Item item = itemRepository.findAll().get(0);
//        result.put("item_id",(item.getItemId()) );
//        result.put("Resource", (item.getResource()));
//        a.add(result);
        List<Item> items = itemRepository.findAll();
        return items;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/funds")
    public @ResponseBody String addFunds (@RequestBody JsonNode payload) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(payload.get("username").textValue()).get();
        user.setAvailableFunds( user.getAvailableFunds() + payload.get("funds").floatValue() );

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


    /*
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
    */
}