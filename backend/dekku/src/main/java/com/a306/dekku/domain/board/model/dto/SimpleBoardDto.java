package com.a306.dekku.domain.board.model.dto;

public record SimpleBoardDto(
        Long id,
        String title,
        String content
) {}