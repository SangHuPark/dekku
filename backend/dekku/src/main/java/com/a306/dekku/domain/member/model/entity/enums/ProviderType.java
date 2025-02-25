package com.a306.dekku.domain.member.model.entity.enums;

import com.a306.dekku.domain.member.exception.InvalidProviderTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Schema(description = "OAuth 로그인 제공자")
@RequiredArgsConstructor
@Getter
public enum ProviderType {

    @Schema(description = "카카오")
    KAKAO("kakao");

    private final String value;

    public static ProviderType convertToEnum(String type) {

        ProviderType provider;

        try {
            provider = ProviderType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidProviderTypeException();
        }

        return provider;

    }

}
