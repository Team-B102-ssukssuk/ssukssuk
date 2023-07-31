package com.ssafy.ssuk.user.repository;

import com.ssafy.ssuk.user.domain.User;

public interface UserRepository {
    public void insert(User newUser);

    public User findByEmail(String email);
}
