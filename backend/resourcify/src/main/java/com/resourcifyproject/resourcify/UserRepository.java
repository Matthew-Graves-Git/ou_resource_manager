package com.resourcifyproject.resourcify;

import org.springframework.data.repository.CrudRepository;
import com.resourcifyproject.resourcify.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserRepository extends CrudRepository<User, Integer> {

}
