package com.ssafy.ssuk.pot.mapper;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotDeleteDto;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.domain.User.UserBuilder;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-11T02:50:29+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_192 (Azul Systems, Inc.)"
)
@Component
public class PotMapperImpl implements PotMapper {

    @Override
    public Pot insertDtoToPot(PotInsertDto potInsertDto, Integer userId) {
        if ( potInsertDto == null && userId == null ) {
            return null;
        }

        Pot pot = new Pot();

        if ( potInsertDto != null ) {
            pot.setSerialNumber( potInsertDto.getSerialNumber() );
        }
        if ( userId != null ) {
            pot.setUser( integerToUser( userId ) );
        }

        return pot;
    }

    @Override
    public Pot deleteDtoToPot(PotDeleteDto potDeleteDto, Integer userId) {
        if ( potDeleteDto == null && userId == null ) {
            return null;
        }

        Pot pot = new Pot();

        if ( userId != null ) {
            pot.setUser( integerToUser1( userId ) );
        }

        return pot;
    }

    protected User integerToUser(Integer integer) {
        if ( integer == null ) {
            return null;
        }

        UserBuilder user = User.builder();

        user.id( integer );

        return user.build();
    }

    protected User integerToUser1(Integer integer) {
        if ( integer == null ) {
            return null;
        }

        UserBuilder user = User.builder();

        user.id( integer );

        return user.build();
    }
}
