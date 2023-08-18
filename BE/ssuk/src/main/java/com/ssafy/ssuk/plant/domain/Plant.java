package com.ssafy.ssuk.plant.domain;

import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "PLANT")
@DynamicInsert
@NoArgsConstructor  // 디폴트 생성자(한줄로 대체하는게 깔끔해보여서 써봤음)
public class Plant {
    @Id @GeneratedValue
    @Column(name = "PLANT_ID")
    private Integer id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;
    @Column(name = "PLANT_NAME")
    private String name;
    @Column(name = "TEMP_MAX")
    private Float tempMax;
    @Column(name = "TEMP_MIN")
    private Float tempMin;
    @Column(name = "MOISTURE_MAX")
    private Float moistureMax;
    @Column(name = "MOISTURE_MIN")
    private Float moistureMin;
    @Column(name = "IS_DONE")
    private Boolean isDone;
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
