package com.ssafy.ssuk.user.repository;

import com.ssafy.ssuk.user.domain.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRolename(String rolename);

}
