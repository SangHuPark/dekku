package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.model.dto.response.CreateMyPageResponseDto;
import dekku.spring_dekku.domain.member.service.MyPageService;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
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
    @GetMapping
    public ResponseEntity getMyPageInfo(@RequestParam Long memberId) {
        CreateMyPageResponseDto response = myPageService.getMyPageInfo(memberId);
        return ResponseUtil.ok(Success.builder().data(response).build());
    }
}
