package dekku.spring_dekku.infra.aws.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "객체 업로드 주소 발행 요청 DTO", description = "객체 업로드에 필요한 정보")
public class CreatePresignedUrlRequestDto {

    @Schema(description = "객체 주인 식별자(프로필 사진 : 유저 식별자 / 게시글 : 게시글 식별자)")
    @NotBlank(message = "식별자를 입력해주세요.")
    private String id;

    @Schema(description = "업로드할 객체 개수", example = "1")
    @NotBlank(message = "업로드 할 파일 개수를 입력해주세요.")
    private int fileCount;

    @Schema(description = "폴더 이름", example = "post")
    @NotBlank(message = "객체를 저장할 폴더 이름(profile / post)을 입력해주세요.")
    private String directory;

}
