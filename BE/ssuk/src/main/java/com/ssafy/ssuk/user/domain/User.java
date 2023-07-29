package com.ssafy.ssuk.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


// 누나 미안해 잠글게..(덕용, 지민)
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class User {

    @Id @GeneratedValue
    @Column(name = "USER_ID")
    private Integer id;

    @Column(name = "USER_NICKNAME")
    private String name;

}
