package com.gouriny.portfolio_be.authservice.presentationlayer;

import com.gouriny.portfolio_be.authservice.businesslayer.AuthUserDetailsService;
import com.gouriny.portfolio_be.authservice.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AuthUserDetailsService authUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthUser loginRequest) {
        try {
            // Authenticate the user (this will call your AuthUserDetailsService)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            // Load the authenticated user's details
            UserDetails userDetails = authUserDetailsService.loadUserByUsername(loginRequest.getUsername());

            // Generate a JWT token for the user
            String token = jwtUtil.generateToken(userDetails);

            // Return token in the response (you might also include user details as needed)
            return ResponseEntity.ok().body(new JwtResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // If authentication is present, perform logout
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
        // Optionally, you can clear any additional server-side state here.
        return ResponseEntity.ok("Logged out successfully");
    }
}

// JwtResponse class to encapsulate the token response:
class JwtResponse {
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}
