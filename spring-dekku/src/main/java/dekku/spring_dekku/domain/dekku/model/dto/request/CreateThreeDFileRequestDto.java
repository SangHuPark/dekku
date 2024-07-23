package dekku.spring_dekku.domain.dekku.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "3D 파일 저장 DTO")
public class CreateThreeDFileRequestDto {

    @NotBlank
    @Schema(description = "저장한 사용자 id")
    private Long memberId;

    @Schema(description = "3D 파일 주소")
    private String threeDFileUrl;

    @Schema(description = "썸네일 사진 주소")
    private String thumbnailUrl;
}
