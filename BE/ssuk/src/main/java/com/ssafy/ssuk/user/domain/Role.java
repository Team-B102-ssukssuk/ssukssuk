package com.ssafy.ssuk.user.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ROLES")
@Getter
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue
    @Column(name = "ROLE_ID")
    private Integer id;

    @Column(name = "ROLENAME")
    private String rolename;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public Role(String rolename) {
        this.rolename = rolename;
    }

}
