package com.ssafy.ssuk.utils.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    /* 기본 */
    OK(HttpStatus.OK, "ok"),


    SUCCESS_FCM(HttpStatus.OK, "OK");
    ;
    //user
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    //추가할 것들은 여기에 작성해주세요.
    //화분

    //식물

    //기타
    SUCCESS_CODE(HttpStatus.OK, "Success"),
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),
    INPUT_EXCEPTION(HttpStatus.BAD_REQUEST, "입력값을 확인하세요");

    private final HttpStatus httpStatus;
    private final String message;

}
