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
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class UserController{

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

            // Get UserDetails (authenticated user)
            UserDetails userDetails = authUserDetailsService.loadUserByUsername(loginRequest.getUsername());

            // Generate the token
            String token = jwtUtil.generateToken(userDetails);

            // Return token in the response
            return ResponseEntity.ok().body(new JwtResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

// JwtResponse class to encapsulate the token response:
class JwtResponse {
    private String token;
    public JwtResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
