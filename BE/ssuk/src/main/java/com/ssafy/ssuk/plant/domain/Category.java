package com.ssafy.ssuk.plant.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "plant_category")
@Getter
@NoArgsConstructor  // 디폴트 생성자(한줄로 대체하는게 깔끔해보여서 써봤음)
public class Category {
    @Id @GeneratedValue
    @Column(name = "category_id")
    private Integer id;
    @Column(name = "category_name")
    private String name;
    @OneToMany(mappedBy = "category")
    private List<Plant> plants = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    /**
     * name만 수정하면 돼서 setter만들어 줌
     * 만약 column이 더 많았다면 modifyCategory(컬럼1, 컬럼2, ...) 이런식으로 했을듯
     */
    public void setName(String name) {
        this.name = name;
    }
}
