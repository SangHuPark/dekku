package com.a306.dekku.domain.board.model.dto;

import com.a306.dekku.domain.board.model.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "게시글")
public record SimpleBoardDto(
        Long id,
        String title,
        String content,
        Long viewCount,
        Long commentCount,
        Long likeCount
) {

    public static SimpleBoardDto of(Board board, long viewCount) {
        return SimpleBoardDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .viewCount(viewCount)
                .commentCount(board.getCommentCount())
                .likeCount(board.getLikeCount())
                .build();
    }
}
