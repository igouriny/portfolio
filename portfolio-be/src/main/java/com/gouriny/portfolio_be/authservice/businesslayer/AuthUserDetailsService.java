package com.gouriny.portfolio_be.authservice.businesslayer;

import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUser;
import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {
    private final AuthUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AuthUser> authUserOpt = userRepository.findByUsername(username.toLowerCase());
        if (!authUserOpt.isPresent()) {
            throw new UsernameNotFoundException(username);
        } else {
            AuthUser authUser = authUserOpt.get();
            return User.builder()
                    .username(authUser.getUsername())
                    .password(authUser.getPassword())
                    .disabled(!authUser.isActive())
                    // Include roles (this will automatically add the "ROLE_" prefix)
                    .roles(authUser.getRole() != null ? authUser.getRole() : "USER")
                    .build();
        }
    }

}

