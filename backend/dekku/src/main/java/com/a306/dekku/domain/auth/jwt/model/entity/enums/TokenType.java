package com.a306.dekku.domain.auth.jwt.model.entity.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public enum TokenType {

    ACCESS_TOKEN("access_token"),
    REFRESH_TOKEN("refresh_token");

    private final String value;
}
