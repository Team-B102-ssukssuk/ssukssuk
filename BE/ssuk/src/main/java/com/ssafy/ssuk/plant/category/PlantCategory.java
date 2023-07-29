package com.ssafy.ssuk.plant.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssuk.plant.Plant;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "plant_category")
@Getter @Setter
public class PlantCategory {
    @Id @GeneratedValue
    @Column(name = "category_id")
    private Integer id;
    @Column(name = "category_name")
    private String name;
    @JsonIgnore // 양방향 연관관계가 있으면 둘 중하나는 JsonIgnore 해줘야 함
    @OneToMany(mappedBy = "plantCategory")
    private List<Plant> plants = new ArrayList<>();

    public PlantCategory(String name) {
        this.name = name;
    }

    public PlantCategory() {

    }
}
