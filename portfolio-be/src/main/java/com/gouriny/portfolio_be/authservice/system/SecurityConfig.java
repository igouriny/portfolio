package com.gouriny.portfolio_be.authservice.system;

import com.gouriny.portfolio_be.authservice.businesslayer.AuthUserDetailsService;
import com.gouriny.portfolio_be.authservice.utils.JwtRequestFilter;  // Ensure this class is implemented
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "http://localhost:3000")
public class SecurityConfig {

    @Autowired
    private AuthUserDetailsService authUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter; // Our JWT filter to intercept requests

    // Password encoder bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Expose the AuthenticationManager if you need it in your login endpoint
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(authUserDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }

    // Security filter chain configuration
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF (stateless JWT use-case)
                .csrf(csrf -> csrf.disable())
                .cors(withDefaults())
                // Configure stateless session management
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configure URL and HTTP method based authorization rules
                .authorizeHttpRequests(authorize -> authorize
                        // Public endpoints (registration, login, GET endpoints, etc.)
                        .requestMatchers(HttpMethod.GET, "/api/v1/register", "/api/v1/login", "/api/v1/academics/**",
                                "/api/v1/about/**", "/api/v1/professional/**", "/api/v1/testimonials/**", "/api/v1/projects/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/logout").permitAll()
                        // Endpoints restricted to ADMIN role for modifying resources
                        .requestMatchers(HttpMethod.POST, "/api/v1/academics").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academics/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academics/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/professional").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/professional/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/professional/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/testimonials").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/testimonials/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/testimonials/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/about").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/about").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/contact").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/projects").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/projects/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/projects/**").hasRole("ADMIN")
                        // Any other request must be authenticated
                        .anyRequest().authenticated()
                )
        // Do not configure HTTP Basic (we're using JWT)
        ;

        // Add JWT filter before Spring Security's authentication filter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // CORS configuration for allowing requests from the frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://portfolio-git-main-igourinys-projects.vercel.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply configuration to all endpoints
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
