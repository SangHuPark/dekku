package com.a306.dekku.domain.product.model.entity.enums;

import com.a306.dekku.domain.member.exception.InvalidGenderTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Schema(description = "제품 유형")
@Getter
public enum ProductType {

    @Schema(description = "모니터")
    MONITOR("monitor"),

    @Schema(description = "노트북")
    LAPTOP("laptop"),

    @Schema(description = "마우스")
    MOUSE("mouse"),

    @Schema(description = "키보드")
    KEYBOARD("keyboard"),

    @Schema(description = "기타")
    ETC("etc");

    private final String value;

    public static ProductType convertToEnum(String type) {

        ProductType productType;

        try {
            productType = ProductType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidGenderTypeException();
        }

        return productType;

    }

}
