package com.ssafy.ssuk.user.repository;

import com.ssafy.ssuk.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

//@Repository
//@RequiredArgsConstructor
//@Slf4j
//public class UserRepositoryImpl implements UserRepository {
//
//    private final EntityManager em;
//
//    @Override
//    public void insert(User newUser) {
//        em.persist(newUser);
//    }
//
//    @Override
//    public User findByEmail(String email) {
//        List<User> users = em.createQuery("select u from User u where u.email = :email", User.class)
//                .setParameter("email", email).getResultList();
//        log.debug("users={}", users);
//        if (users.isEmpty()) return null;
//        return users.get(0);
//    }
//
//
//
//
//}
