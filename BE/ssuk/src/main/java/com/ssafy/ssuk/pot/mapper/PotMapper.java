package com.ssafy.ssuk.pot.mapper;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PotMapper {

    @Mapping(source = "userId", target = "user.id")
    Pot insertDtoToPot(PotInsertDto potInsertDto);
}
