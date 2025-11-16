package com.example.backend.repository;

import com.example.backend.model.DailyFootprint;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    @EntityGraph(attributePaths = {"roles"})
    User findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(
            value = "SELECT * FROM user WHERE id_user=:id",
            nativeQuery = true)
    User findUserById(@Param("id") Integer id);
}