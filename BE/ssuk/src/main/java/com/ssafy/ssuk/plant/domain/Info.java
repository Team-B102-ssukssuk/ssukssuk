package com.ssafy.ssuk.plant.domain;

import com.ssafy.ssuk.plant.domain.id.InfoId;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
@Table(name = "PLANT_INFO")
@IdClass(InfoId.class)
@NoArgsConstructor
@Getter
public class Info {

    @Id
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PLANT_ID")
    private Plant plant;
    @Id
    private Integer level;
    @Column(name = "PLANT_GUIDE")
    private String guide;
    @Column(name = "WATER_TERM")
    private Integer waterTerm;
    @Column(name = "WATER_AMOUNT")
    private Integer waterAmount;
    @Column(name = "CHARACTER_NAME")
    private String characterName;
    @Column(name = "CHARACTER_COMMENT")
    private String characterComment;
    @Column(name = "CHARACTER_IMAGE")
    private String characterImage;

    public Info(InfoRegisterRequestDto infoRegisterRequestDto, Plant plant) {
        this.plant = plant;
        this.level = infoRegisterRequestDto.getLevel();
        this.guide = infoRegisterRequestDto.getPlantGuide();
        this.waterTerm = infoRegisterRequestDto.getWaterTerm();
        this.waterAmount = infoRegisterRequestDto.getWaterAmount();
        this.characterName = infoRegisterRequestDto.getCharacterName();
        this.characterComment = infoRegisterRequestDto.getCharacterComment();
        this.characterImage = infoRegisterRequestDto.getCharacterImage();
    }

    public void modifyInfo(InfoUpdateRequestDto infoUpdateRequestDto) {
        this.guide = infoUpdateRequestDto.getPlantGuide();
        this.waterTerm = infoUpdateRequestDto.getWaterTerm();
        this.waterAmount = infoUpdateRequestDto.getWaterAmount();
        this.characterName = infoUpdateRequestDto.getCharacterName();
        this.characterComment = infoUpdateRequestDto.getCharacterComment();
        this.characterImage = infoUpdateRequestDto.getCharacterImage();
    }
}
