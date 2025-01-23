package com.gouriny.portfolio_be.authservice.presentationlayer;
import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUser;
import com.gouriny.portfolio_be.authservice.presentationlayer.AuthUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private final AuthUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("api/v1/register")
    public ResponseEntity registerUser(@RequestBody AuthUser user){
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken. Please try again");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            AuthUser save = userRepository.save(user);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("api/v1/login")
    public ResponseEntity loginUser(@RequestBody AuthUser user){
        try {
            AuthUser authUser = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new Exception("User not found"));
            if (passwordEncoder.matches(user.getPassword(), authUser.getPassword()))
                return ResponseEntity.ok(HttpStatus.OK);
            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("api/v1/users")
    public ResponseEntity getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }
}
