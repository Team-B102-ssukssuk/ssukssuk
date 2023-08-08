package com.ssafy.ssuk.badge.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BadgeCode {
    쑥쑥을_위하여(6),
    시작이반(7),
    가만히_있어도_절반은_간다(8),
    정신차리고보니(9);
    private final Integer code;
}
