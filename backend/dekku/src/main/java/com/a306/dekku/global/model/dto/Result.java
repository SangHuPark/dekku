package com.a306.dekku.global.model.dto;

import com.a306.dekku.global.util.ClockUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Result<T> {

    @Schema(description = "요청 시간")
    private String timestamp;

    @Schema(description = "추적 ID")
    private UUID trackingId;

    @Schema(description = "결과")
    private T data;

    private Result(T data) {
        this.timestamp = ClockUtil.getLocalDateTimeToString();
        this.trackingId = UUID.randomUUID();
        this.data = data;
    }

    public static <T> Result<T> of(T data) {
        return new Result<>(data);
    }

    public static <T> Result<T> empty() {
        return new Result<>(null);
    }

}
