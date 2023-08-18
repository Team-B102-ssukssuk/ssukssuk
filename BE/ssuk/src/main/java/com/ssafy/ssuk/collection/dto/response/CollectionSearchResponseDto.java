package com.ssafy.ssuk.collection.dto.response;

import com.ssafy.ssuk.collection.domain.Collection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CollectionSearchResponseDto {
    private Integer level;
    private Integer plantId;
    private LocalDateTime createdDate;

    public CollectionSearchResponseDto(Collection c) {
        this.level = c.getId().getLevel();
        this.plantId = c.getId().getPlantId();
        this.createdDate = c.getCreatedDate();
    }
}
