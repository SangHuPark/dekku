package dekku.spring_dekku.infra.aws.controller;

import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import dekku.spring_dekku.infra.aws.model.dto.request.CreatePresignedUrlRequestDto;
import dekku.spring_dekku.infra.aws.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "S3 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;

    @Operation(
            summary = "객체 업로드를 위한 주소 발행",
            description = "사진과 동영상 등을 저장하기 위해 미리 서명된 주소를 받는다. <br>"
                    + "- 프로필 사진 | [id = 유저 식별자] / [path = profile] <br>"
                    + "- 게시글 사진 | [id = 게시글 식별자] / [path = post] <br>"
                    + "- 3d 사진 | [id = 3d 식별자] / [path = 3d] <br>"
    )
    @PostMapping("/presigned-url")
    public ResponseEntity createPresignedUrl(@RequestBody CreatePresignedUrlRequestDto request) {

        return ResponseUtil.ok(
                Success.builder()
                        .data(s3Service.generatePreSignedUrl(request.getId(), request.getFileCount(), request.getDirectory()))
                        .build()
        );
    }
}
