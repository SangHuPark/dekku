package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "데스크테리어 게시글 저장 응답 DTO")
public class CreateDeskteriorPostResponseDto {

    @Schema(description = "제목")
    private String title;

    @Schema(description = "내용")
    private String content;

}
