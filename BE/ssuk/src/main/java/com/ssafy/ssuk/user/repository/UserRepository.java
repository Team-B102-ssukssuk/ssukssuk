package com.ssafy.ssuk.user.repository;

import com.ssafy.ssuk.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    User save(User newUser);

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    //public User findById(int userId);

    // 비밀번호 업데이트
    @Modifying
    @Query("UPDATE User u SET u.password = :newPassword WHERE u.email = :email")
    void updatePassword(@Param("email") String email, @Param("newPassword") String newPassword);

}
