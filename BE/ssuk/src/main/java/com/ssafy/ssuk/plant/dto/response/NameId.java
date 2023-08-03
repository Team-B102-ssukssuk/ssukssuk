package com.ssafy.ssuk.plant.dto.response;

import lombok.Data;

@Data
public class NameId {
    public Integer plantId;
    public String plantName;

    public NameId(Integer id, String name) {
        this.plantId = id;
        this.plantName = name;
    }
}
