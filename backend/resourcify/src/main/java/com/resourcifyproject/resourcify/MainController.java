package com.resourcifyproject.resourcify;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping(path="/demo") // This means all URLs start with /demo (after Application path)
public class MainController {
    @Autowired // This means to get the bean called userRepository which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;
    @Autowired
    private ResourceRepository resourcerepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void updateQuantity(int resource_id) {
        Resource r = resourcerepository.findById(resource_id).get();
        r.setQuantityBorrow( itemRepository.countItems(  resource_id, ItemType.BORROW.name(), true  )  );
        r.setQuantitySale( itemRepository.countItems(  resource_id, ItemType.SALE.name(), true  ) );
        resourcerepository.save(r);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/user")
    public @ResponseBody String createOrEditUser (@RequestBody JsonNode payload) {
        if ( payload.get("request_type").textValue().equals("create") && userRepository.findByUsername(  payload.get("username").textValue()  ).isPresent() ) {
            return "Username Already Exists";
        }
        else if ( payload.get("request_type").textValue().equals("create") ) {
            User n = new User();
            n.setRole(payload.get("role").textValue());
            n.setUsername(payload.get("username").textValue());
            n.setPassword(  passwordEncoder.encode(payload.get("password").textValue())  );
            n.setLastname(payload.get("lastname").textValue());
            n.setFirstname(payload.get("firstname").textValue());
            userRepository.save(n);
            return "Created New User";
        }
        else if ( payload.get("request_type").textValue().equals("edit") && userRepository.findByUsername(  payload.get("username").textValue()  ).isPresent() ) {
            User n = userRepository.findByUsername(  payload.get("username").textValue()  ).get();
            n.setRole(payload.get("role").textValue());
            if ( payload.get("confirm_set_password").textValue().equals("yes") ) {
                n.setPassword(  passwordEncoder.encode(payload.get("password").textValue())  );
            }
            n.setLastname(payload.get("lastname").textValue());
            n.setFirstname(payload.get("firstname").textValue());
            n.setAvailableFunds(Float.valueOf(payload.get("funds").asText()));
            userRepository.save(n);
            return "Updated User";
        }
        else {
            return "User Not Found";
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/funds")
    public @ResponseBody String addFunds (@RequestBody JsonNode payload) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(  payload.get("username").textValue()  ).get();
        user.setAvailableFunds( user.getAvailableFunds() + Float.valueOf(payload.get("funds").asText()) );
        userRepository.save(user);
        return "Added Funds";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/resource")
    public @ResponseBody String createOrEditResource (@RequestBody JsonNode payload) {
        if ( payload.get("request_type").textValue().equals("create") ) {
            Resource r = new Resource();
            r.setResourceCategory(payload.get("resource_category").textValue());
            r.setName(payload.get("name").textValue());
            r.setDescription(payload.get("description").textValue());
            r.setImage(payload.get("image").textValue());
            r.setModelNumber(payload.get("model_number").textValue());
            r.setBorrowPrice(Float.parseFloat(payload.get("borrow_price").textValue()));
            r.setSalePrice(Float.parseFloat(payload.get("sale_price").textValue()));
            resourcerepository.save(r);
            return "Created New Resource";
        }
        else if ( payload.get("request_type").textValue().equals("edit") && resourcerepository.findById(  payload.get("resource_id").asInt() ).isPresent() ) {
            Resource r = resourcerepository.findById(  payload.get("resource_id").asInt()  ).get();
            r.setResourceCategory(payload.get("resource_category").textValue());
            r.setName(payload.get("name").textValue());
            r.setDescription(payload.get("description").textValue());
            r.setImage(payload.get("image").textValue());
            r.setModelNumber(payload.get("model_number").textValue());
            r.setBorrowPrice(Float.parseFloat(payload.get("borrow_price").textValue()));
            r.setSalePrice(Float.parseFloat(payload.get("sale_price").textValue()));
            resourcerepository.save(r);
            return "Edited Resource";
        }
        else {
            return "Resource ID not found";
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add/item")
    public @ResponseBody String addNewItem (@RequestBody JsonNode payload) {
        Resource r = resourcerepository.findById(  payload.get("resource_id").asInt()  ).get();
        Item i = new Item();
        i.setResource(r);
        i.setItemType(payload.get("item_type").textValue());
        i.setSerialNumber(payload.get("serial_number").textValue());
        i.setAvailable(true);
        itemRepository.save(i);
        updateQuantity(payload.get("resource_id").asInt());
        return "Added Item";
    }

    @CrossOrigin(origins = "http://localhost:3000")

    @PostMapping(path="/get/resource")
    public @ResponseBody List<Resource> getResourcesByType(@RequestBody JsonNode payload) {
        if(payload.get("resource_category").asText().equals("ALL")){
            return resourcerepository.findAll();
        }
        return resourcerepository.getResources(  payload.get("resource_category").asText() ).get();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/get/cart")
    public @ResponseBody List<Resource> getCart(HttpServletRequest request) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        return resourcerepository.getResourcesCart(  user.getCart()  ).get();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/get/user/purchased")
    public @ResponseBody List<Item> getPurchasedItems(HttpServletRequest request) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        List<Item> purchasedItems = itemRepository.getItemsByUsername(  user.getUsername(), "SALE"  ).get();
        if(purchasedItems.isEmpty()){
            throw new ResourceNotFoundException("You have not purchased any items!");
        }
        return purchasedItems;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/get/user/borrowed")
    public @ResponseBody List<Item> getBorrowedItems(HttpServletRequest request) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        List<Item> borrowedItems = itemRepository.getItemsByUsername(  user.getUsername(), "BORROW"  ).get();
        if(borrowedItems.isEmpty()){
            throw new ResourceNotFoundException("You are not currently borrowing any items!");
        }
        return borrowedItems;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/get/user")
    public @ResponseBody User getUser(HttpServletRequest request) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        return user;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/update_password")
    public @ResponseBody String updatePassword(HttpServletRequest request, @RequestBody JsonNode payload) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        if (  passwordEncoder.encode( payload.get("current_password").textValue() ).equals( user.getPassword() )  ) {
            user.setPassword(  passwordEncoder.encode(payload.get("new_password").textValue())  );
            return "Updated Password";
        }
        else {
            return "Current Password Is Incorrect";
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/cart_add")
    public @ResponseBody String addToCart(HttpServletRequest request, @RequestBody JsonNode payload) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        List<String> cart = user.getCart();
        cart.add(payload.get("resource_id").asText());
        user.setCart(cart);
        userRepository.save(user);
        return "Added To Cart";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/cart_remove")
    public @ResponseBody String removeFromCart(HttpServletRequest request, @RequestBody JsonNode payload) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        List<String> cart = user.getCart();
        cart.remove(payload.get("resource_id").asText());
        user.setCart(cart);
        userRepository.save(user);
        return "Removed From Cart";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/purchase")
    public @ResponseBody String doPurchase(HttpServletRequest request, @RequestBody JsonNode payload) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        Resource resource = resourcerepository.findById(  payload.get("resource_id").asInt()  ).get();
        if ( user.getAvailableFunds() < resource.getSalePrice() ) {
            throw new ForbiddenException(); //They don't have enough money
        }
        if ( itemRepository.countItems(  payload.get("resource_id").asInt(),  ItemType.SALE.name(), true  ) < 1 ) {
            throw new ArithmeticException(); //There is not an item available to purchase
        }
        Item itemToPurchase = itemRepository.getItemForTransaction(  payload.get("resource_id").asInt(), ItemType.SALE.name(), true  ).get();
        itemToPurchase.setAvailable(false);
        itemToPurchase.setUsername(user.getUsername());
        itemToPurchase.setTransactionPrice(resource.getSalePrice());
        itemToPurchase.setTransactionTime(LocalDateTime.now());
        updateQuantity(payload.get("resource_id").asInt());
        return "Purchase Successful!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/borrow")
    public @ResponseBody String doBorrow(HttpServletRequest request, @RequestBody JsonNode payload) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        Resource resource = resourcerepository.findById(  payload.get("resource_id").asInt()  ).get();
        if ( user.getAvailableFunds() < resource.getBorrowPrice() ) {
            throw new ForbiddenException(); //They don't have enough money
        }
        if ( itemRepository.countItems(  payload.get("resource_id").asInt(), ItemType.BORROW.name(), true  ) < 1 ) {
            throw new ArithmeticException(); //There is not an item available to borrow
        }
        Item itemToBorrow = itemRepository.getItemForTransaction(  payload.get("resource_id").asInt(), ItemType.BORROW.name(), true  ).get();
        itemToBorrow.setAvailable(false);
        itemToBorrow.setUsername(user.getUsername());
        itemToBorrow.setTransactionPrice(resource.getBorrowPrice());
        itemToBorrow.setTransactionTime(LocalDateTime.now());
        itemToBorrow.setBorrowTime(payload.get("borrow_time").asLong());
        updateQuantity(payload.get("resource_id").asInt());
        return "Borrow Successful!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/do/return")
    public @ResponseBody String doReturn(@RequestBody JsonNode payload) {
        Item item = itemRepository.findById(  payload.get("item_id").asInt()  ).get();
        item.setTransactionTime(null);
        item.setTransactionPrice(null);
        item.setBorrowTime(null);
        updateQuantity(payload.get("resource_id").asInt());
        return "Return Successful!";
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    public class ForbiddenException extends RuntimeException {}

    @GetMapping(path="/confirm")
    public @ResponseBody String isAdmin (HttpServletRequest request) {
        User user = userRepository.findByUsername(  request.getRemoteUser()  ).get();
        if(user != null) {
            if ((user.getRole()) == Role.valueOf("ADMIN")) {
                return "Success";
            }
        }
        throw new ForbiddenException();
    }
}