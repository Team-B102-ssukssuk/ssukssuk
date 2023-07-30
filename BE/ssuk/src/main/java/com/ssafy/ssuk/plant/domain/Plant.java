package com.ssafy.ssuk.plant.domain;

import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "plant")
@NoArgsConstructor  // 디폴트 생성자(한줄로 대체하는게 깔끔해보여서 써봤음)
public class Plant {
    @Id @GeneratedValue
    @Column(name = "plant_id")
    private Integer id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
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
    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL)
    private List<Info> infos = new ArrayList<>();

    public Plant(Category plantCategory, String name, Float tempMax, Float tempMin, Float moistureMax, Float moistureMin) {
        this.category = plantCategory;
        this.name = name;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.moistureMax = moistureMax;
        this.moistureMin = moistureMin;
    }

    // 비즈니스 로직
    public void updateInfo(PlantUpdateRequestDto plantUpdateRequestDto, Category category) {
        this.category = category;
        this.name = plantUpdateRequestDto.getPlantName();
        this.tempMax = plantUpdateRequestDto.getTempMax();
        this.tempMin = plantUpdateRequestDto.getTempMin();
        this.moistureMax = plantUpdateRequestDto.getMoistureMax();
        this.moistureMin = plantUpdateRequestDto.getMoistureMin();
    }
}
