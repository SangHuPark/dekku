package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "데스크테리어 게시글 저장 응답 DTO")
public record CreateDeskteriorPostResponseDto(

        @Schema(description = "제목")
        String title,

        @Schema(description = "내용")
        String content,

        @Schema(description = "게시글ID")
        Long postId
) {

}
