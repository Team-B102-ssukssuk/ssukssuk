package com.ssafy.ssuk.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 예시 */
    TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "대충 꼴받는 메시지"),

    //user 관련 예외
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    DUPLICATE_USER_ID(HttpStatus.CONFLICT, "중복된 아이디입니다."), // 409 : CONFLICT
    DUPLICATE_USER_EMAIL(HttpStatus.CONFLICT, "중복된 이메일입니다."), // 409 : CONFLICT
    DUPLICATE_USER_NICKNAME(HttpStatus.CONFLICT, "중복된 닉네임입니다."), // 409 : CONFLICT
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    EXPIRED_AUTH_TOKEN(HttpStatus.ACCEPTED, "토큰이 만료되었습니다."),

    //추가할 것들은 여기에 작성해주세요.
    //화분
    INVALID_SERIAL_NUMBER(HttpStatus.BAD_REQUEST, "유효하지 않은 시리얼 넘버입니다."),
    POT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 화분이 유효하지 않습니다."),

    //식물 정보
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 카테고리가 유효하지 않습니다."),
    PLANT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 식물이 유효하지 않습니다."),
    PLANT_INFO_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 식물 단계 정보가 유효하지 않습니다."),

    //기타
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),
    INPUT_EXCEPTION(HttpStatus.BAD_REQUEST, "입력값을 확인하세요")
    ;

    private final HttpStatus httpStatus;
    private final String message;

}
