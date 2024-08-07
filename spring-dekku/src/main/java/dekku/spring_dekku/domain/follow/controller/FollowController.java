package dekku.spring_dekku.domain.follow.controller;

import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowingListResponseDto;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowerListResponseDto;
import dekku.spring_dekku.domain.follow.service.FollowService;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "팔로우 관련 API")
@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @Operation(summary = "팔로워 목록 조회")
    @GetMapping("/followers")
    public ResponseEntity<List<CreateFollowerListResponseDto>> getFollowerList(@RequestHeader("Access") String token) {
        List<CreateFollowerListResponseDto> allFollowers = followService.getFollowerList(token);
        if (allFollowers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(allFollowers);
        }
        return ResponseEntity.status(HttpStatus.OK).body(allFollowers);
    }

    @Operation(summary = "팔로잉 목록 조회")
    @GetMapping("/following")
    public ResponseEntity<List<CreateFollowingListResponseDto>> getFollowingList(@RequestHeader("Access") String token) {
        List<CreateFollowingListResponseDto> allFollowings = followService.getFollowingList(token);
        if (allFollowings.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(allFollowings);
        }
        return ResponseEntity.status(HttpStatus.OK).body(allFollowings);
    }

    @Operation(summary = "팔로우 하기")
    @PostMapping("/follow")
    public ResponseEntity<Success> follow(@RequestHeader("Access") String token, @RequestParam Long toMemberId) {
        followService.follow(token, toMemberId);
        return ResponseUtil.ok(Success.builder().build());
    }

    @Operation(summary = "팔로우 취소하기")
    @PostMapping("/unfollow")
    public ResponseEntity<Success> unfollow(@RequestHeader("Access") String token, @RequestParam Long toMemberId) {
        followService.unfollow(token, toMemberId);
        return ResponseUtil.ok(Success.builder().build());
    }
}