package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.model.dto.response.CreateMyPageResponseDto;
import dekku.spring_dekku.domain.member.service.MyPageService;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "마이페이지 관련 API")
@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;

    @Operation(summary = "마이페이지 정보 조회")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "마이페이지 정보 조회 성공",
                    content = @Content(schema = @Schema(implementation = CreateMyPageResponseDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 회원"
            )
    })
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMyPageInfo(@PathVariable Long memberId) {
        CreateMyPageResponseDto response = myPageService.getMyPageInfo(memberId);

        return ResponseUtil.ok(
                Success.builder()
                        .data(response)
                        .build()
        );
    }
}
