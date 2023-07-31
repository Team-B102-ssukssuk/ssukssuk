package com.ssafy.ssuk.pot.mapper;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.user.domain.User;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-30T19:13:40+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_192 (Azul Systems, Inc.)"
)
@Component
public class PotMapperImpl implements PotMapper {

    @Override
    public Pot insertDtoToPot(PotInsertDto potInsertDto) {
        if ( potInsertDto == null ) {
            return null;
        }

        Pot pot = new Pot();

        pot.setUser( potInsertDtoToUser( potInsertDto ) );
        pot.setSerialNumber( potInsertDto.getSerialNumber() );

        return pot;
    }

    protected User potInsertDtoToUser(PotInsertDto potInsertDto) {
        if ( potInsertDto == null ) {
            return null;
        }

        User user = new User();

        user.setId( potInsertDto.getUserId() );

        return user;
    }
}
