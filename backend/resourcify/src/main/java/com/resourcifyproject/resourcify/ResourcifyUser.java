package com.resourcifyproject.resourcify;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;

import static java.lang.String.valueOf;

public class ResourcifyUser implements UserDetails {

    private final Integer id;
    private final Role role;
    private final String username;
    private final String password;
    private final String firstname;
    private final String lastname;
    private final float availablefunds;
    private Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();

    public ResourcifyUser(User user) {
        this.id = user.getId();
        this.role = user.getRole();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.availablefunds = user.getAvailablefunds();
        this.authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
