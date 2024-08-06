package dekku.spring_dekku.domain.member.controller;

import dekku.spring_dekku.domain.member.model.dto.response.FollowerListResponseDto;
import dekku.spring_dekku.domain.member.model.dto.response.FollowingListResponseDto;
import dekku.spring_dekku.domain.member.service.FollowService;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "팔로우 관련 API")
@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @Operation(summary = "팔로잉 목록 조회")
    @GetMapping("/following")
    public ResponseEntity getFollowingList(@RequestParam Long toMemberId) {
        FollowingListResponseDto response = followService.getFollowingList(toMemberId);
        return ResponseUtil.ok(Success.builder().data(response).build());
    }

    @Operation(summary = "팔로워 목록 조회")
    @GetMapping("/followers")
    public ResponseEntity getFollowerList(@RequestParam Long fromMemberId) {
        FollowerListResponseDto response = followService.getFollowerList(fromMemberId);
        return ResponseUtil.ok(Success.builder().data(response).build());
    }

    @Operation(summary = "팔로우 하기")
    @PostMapping("/follow")
    public ResponseEntity follow(@RequestParam Long fromMemberId, @RequestParam Long toMemberId) {
        followService.follow(fromMemberId, toMemberId);
        return ResponseUtil.ok(Success.builder().build());
    }

    @Operation(summary = "팔로우 취소하기")
    @PostMapping("/unfollow")
    public ResponseEntity unfollow(@RequestParam Long fromMemberId, @RequestParam Long toMemberId) {
        followService.unfollow(fromMemberId, toMemberId);
        return ResponseUtil.ok(Success.builder().build());
    }
}
