package com.ssafy.ssuk.plant.dto.response;

import lombok.Data;

@Data
public class NameId {
    public Integer plantId;
    public String plantName;
    public Boolean isDone;

    public NameId(Integer id, String name, Boolean isDone) {
        this.plantId = id;
        this.plantName = name;
        this.isDone = isDone;
    }
}
