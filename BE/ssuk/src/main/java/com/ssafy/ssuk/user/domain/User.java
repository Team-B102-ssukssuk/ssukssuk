package com.ssafy.ssuk.user.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class User {

    @Id
    private Integer id;
    private String name;
}
