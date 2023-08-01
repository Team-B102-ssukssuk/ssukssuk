package com.ssafy.ssuk.collection.domain.id;

import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.domain.id.InfoId;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class CollectionId implements Serializable {
    @Column(name = "USER_ID")
    private Integer userId;
    @Column(name = "PLANT_ID")
    private Integer plantId;
    @Column(name = "LEVEL")
    private Integer level;
}
