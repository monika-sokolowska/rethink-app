package com.example.backend.controller;
import com.example.backend.DTO.*;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.model.ERole;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.HouseholdFootprintRepository;
import com.example.backend.model.HouseholdFootprint;
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
import java.sql.Date;
import java.time.LocalDate;
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

    @Autowired
    HouseholdFootprintRepository householdFootprintRepository;

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userService.returnAllUsers();
    }


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
        User savedUser = userRepository.save(user);
        
        HouseholdFootprint householdFootprint = new HouseholdFootprint();
        householdFootprint.setUser(savedUser);
        householdFootprint.setFootprint(0.0f);
        householdFootprint.setDate(Date.valueOf(LocalDate.now()));
        householdFootprintRepository.save(householdFootprint);

        return ResponseEntity.ok(1);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PatchMapping(path="/goal/change")
    public ResponseEntity<UserDTO> changeMainGoal(@RequestBody MainGoalDTO mainGoalDTO) {

        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(userService.changeMainGoalById(user.getId(), mainGoalDTO));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(path="/get")
    public ResponseEntity<UserDTO> getUser() {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(userService.findUserById(user.getId()));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PatchMapping(path="/update-name")
    public ResponseEntity<UserDTO> updateUserName(@RequestBody UpdateUserNameDTO updateDTO) {
        UserDetailsImpl currentUser = GetCurrentUser();
        // Users can only update their own name, admins can update any user's name
        if (!currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            // If not admin, ensure user is updating their own name
            if (currentUser.getId() != updateDTO.userId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }
        return ResponseEntity.ok(userService.updateUserNameById(updateDTO.userId(), updateDTO));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PatchMapping(path="/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDTO updateDTO) {
        UserDetailsImpl currentUser = GetCurrentUser();
        if (!currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            if (currentUser.getId() != updateDTO.userId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }
        
        try {
            UserDTO updatedUser = userService.updatePasswordById(updateDTO.userId(), updateDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}