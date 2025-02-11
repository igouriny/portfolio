package com.gouriny.portfolio_be.utils.dataloaders;

import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUser;
import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataLoader implements CommandLineRunner {

    private final AuthUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataLoader(AuthUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create an admin user if not already present
        if (!userRepository.findByUsername("admin").isPresent()) {
            AuthUser admin = AuthUser.builder()
                    .username("ilyass")
                    .password(passwordEncoder.encode("admin"))
                    .active(true)
                    .role("ADMIN") // Set the role to ADMIN
                    .build();
            userRepository.save(admin);
        }
    }
}

