package dekku.spring_dekku.domain.follow.controller;

import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowingListResponseDto;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowerListResponseDto;
import dekku.spring_dekku.domain.follow.service.FollowService;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로워 정보 조회 완료",
                    content = @Content(schema = @Schema(implementation = List.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "팔로워가 없을 경우"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "조회하려는 계정이 없는 경우"
            )
    })
    @GetMapping("/followers/{memberId}")
    public ResponseEntity<List<CreateFollowerListResponseDto>> getFollowerList(@PathVariable Long memberId) {
        List<CreateFollowerListResponseDto> allFollowers = followService.getFollowerList(memberId);
        if (allFollowers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(allFollowers);
    }

    @Operation(summary = "팔로잉 목록 조회")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로잉 정보 조회 완료",
                    content = @Content(schema = @Schema(implementation = List.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "팔로잉 목록이 없을 경우"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "조회하려는 계정이 없는 경우"
            )
    })
    @GetMapping("/following/{memberId}")
    public ResponseEntity<List<CreateFollowingListResponseDto>> getFollowingList(@PathVariable Long memberId) {
        List<CreateFollowingListResponseDto> allFollowings = followService.getFollowingList(memberId);
        if (allFollowings.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(allFollowings);
    }


    @Operation(summary = "팔로우")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로잉 정보 조회 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "팔로우할 계정이 없는 경우"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "이미 해당 계정을 팔로우한 상태"
            )
    })
    @PostMapping("/follow/{toMemberId}")
    public ResponseEntity<?> follow(@RequestHeader("Access") String token, @PathVariable Long toMemberId) {
        followService.follow(token, toMemberId);

        return ResponseUtil.ok(Success.builder().build());
    }

    @Operation(summary = "언팔로우")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "언팔로우 완료"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "언팔로우할 계정이 없는 경우"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "해당 계정을 팔로우하지 않은 상태"
            )

    })
    @PostMapping("/unfollow/{toMemberId}")
    public ResponseEntity<?> unfollow(@RequestHeader("Access") String token, @PathVariable Long toMemberId) {
        followService.unfollow(token, toMemberId);

        return ResponseUtil.ok(Success.builder().build());
    }

    @Operation(summary = "특정 유저를 팔로우 했는지 확인")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로우 여부 확인 완료",
                    content = @Content(schema = @Schema(implementation = Boolean.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "조회하려는 유저 또는 팔로우할 유저가 존재하지 않는 경우"
            )
    })
    @GetMapping("/is-following/{memberId}")
    public ResponseEntity<Boolean> isFollowingUser(@RequestHeader("Access") String token,
                                                   @PathVariable Long memberId) {
        boolean isFollowing = followService.isFollowingUser(token, memberId);
        return ResponseEntity.status(HttpStatus.OK).body(isFollowing);
    }

}