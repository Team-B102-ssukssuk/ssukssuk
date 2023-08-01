package com.ssafy.ssuk.user.repository;

import com.ssafy.ssuk.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>{

    User save(User newUser);

    Optional<User> findByEmail(String email);

    //public User findById(int userId);
}
