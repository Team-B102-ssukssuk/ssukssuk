package com.ssafy.ssuk.plant;

import com.ssafy.ssuk.plant.category.PlantCategory;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
public class Plant {
    @Id @GeneratedValue
    @Column(name = "plant_id")
    private Integer id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private PlantCategory plantCategory;
    @Column(name = "plant_name")
    private String name;
    @Column(name = "temp_max")
    private Float tempMax;
    @Column(name = "temp_min")
    private Float tempMin;
    @Column(name = "moisture_max")
    private Float moistureMax;
    @Column(name = "moisture_min")
    private Float moistureMin;

    public Plant() {
    }

    public Plant(PlantCategory plantCategory, String name, Float tempMax, Float tempMin, Float moistureMax, Float moistureMin) {
        this.plantCategory = plantCategory;
        this.name = name;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.moistureMax = moistureMax;
        this.moistureMin = moistureMin;
    }
}
