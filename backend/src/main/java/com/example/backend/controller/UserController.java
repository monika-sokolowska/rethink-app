package com.example.backend.controller;
import com.example.backend.DTO.*;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.model.ERole;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.jwt.JwtUtils;
import com.example.backend.security.services.UserDetailsImpl;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.backend.security.Utils.GetCurrentUser;

@RestController
@CrossOrigin
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userService.returnAllUsers();
    }

    //    @PostMapping(path="/login")
    //    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO loginDTO) {
    //
    //        try {
    //            User user = userService.getUserByEmail(loginDTO.email());
    //            if(!user.getPassword().equals(loginDTO.password()))
    //                throw new UserNotFoundException("User with given password not found.");
    //            return ResponseEntity.ok(userService.convertUserToUserDTO(user));
    //        } catch (UserNotFoundException e) {
    //            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    //        }
    //
    //    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtDTO(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO register) {

        if (userRepository.existsByEmail(register.email())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(register.name(), register.lastName(), register.email(),
                encoder.encode(register.password()));

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(ERole.ROLE_USER);
        if(userRole == null ) {
            throw new RuntimeException("Role not found");
        }
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(1);
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping(path="/goal/change")
    public ResponseEntity<UserDTO> changeMainGoal(@RequestBody MainGoalDTO mainGoalDTO) {

        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(userService.changeMainGoalById(user.getId(), mainGoalDTO));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(path="/get")
    public ResponseEntity<UserDTO> getUser() {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(userService.findUserById(user.getId()));
    }
}