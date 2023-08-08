package com.ssafy.ssuk.notify.mapper;

import com.ssafy.ssuk.notify.domain.Fcm;
import com.ssafy.ssuk.notify.dto.TokenRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FcmMapper {

    @Mapping(source = "userId", target = "user.id")
    Fcm requestDtoToFcm(TokenRequestDto tokenRequestDto, Integer userId);
}
