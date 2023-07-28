package com.ssafy.ssuk.user.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;


// 누나 미안해 잠글게..(덕용, 지민)
@Entity
@Getter
public class User {

    @Id
    private Integer id;
    private String name;
}
