package com.ssafy.ssuk.badge.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BadgeCode {
    쑥쑥을_위하여(1),
    정원의_수호자(2),
    쑥쑥이의_성장_기록(3),
    오잉_쑥쑥이의_상태가(4),
    치즈(5),
    바람과_함께_사라지다(6),
    시작이반(7),
    가만히_있어도_절반은_간다(8),
    정신차리고보니(9);
    private final Integer code;
}
