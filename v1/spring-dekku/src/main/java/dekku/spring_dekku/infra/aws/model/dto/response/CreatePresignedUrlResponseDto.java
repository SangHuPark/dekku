package dekku.spring_dekku.infra.aws.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Schema(name = "S3 객체 업로드 주소 발행 응답 DTO", description = "발행한 S3 주소에 대한 정보")
@Getter
@Builder(access = AccessLevel.PROTECTED)
public class CreatePresignedUrlResponseDto {

    @Schema(description = "발행한 S3 주소")
    List<String> preSignedUrl;

    public static CreatePresignedUrlResponseDto of(List<String> preSignedUrls) {
        return CreatePresignedUrlResponseDto.builder()
                .preSignedUrl(preSignedUrls)
                .build();
    }
}
