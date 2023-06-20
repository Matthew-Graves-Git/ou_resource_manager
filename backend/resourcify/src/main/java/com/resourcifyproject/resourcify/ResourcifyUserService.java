package com.resourcifyproject.resourcify;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import java.util.Optional;

@Component
public class ResourcifyUserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userInfo = repository.findByUsername(username);
        return userInfo.map(ResourcifyUserDetails::new)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}
