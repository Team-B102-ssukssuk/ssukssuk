package com.ssafy.ssuk.notify.mapper;

import com.ssafy.ssuk.notify.domain.Fcm;
import com.ssafy.ssuk.notify.dto.TokenRequestDto;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.domain.User.UserBuilder;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-11T20:35:26+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_192 (Azul Systems, Inc.)"
)
@Component
public class FcmMapperImpl implements FcmMapper {

    @Override
    public Fcm requestDtoToFcm(TokenRequestDto tokenRequestDto, Integer userId) {
        if ( tokenRequestDto == null && userId == null ) {
            return null;
        }

        Fcm fcm = new Fcm();

        if ( tokenRequestDto != null ) {
            fcm.setFcm_token( tokenRequestDto.getFcm_token() );
        }
        if ( userId != null ) {
            fcm.setUser( integerToUser( userId ) );
        }

        return fcm;
    }

    protected User integerToUser(Integer integer) {
        if ( integer == null ) {
            return null;
        }

        UserBuilder user = User.builder();

        user.id( integer );

        return user.build();
    }
}
