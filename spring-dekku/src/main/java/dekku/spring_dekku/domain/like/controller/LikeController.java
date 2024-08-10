package dekku.spring_dekku.domain.like.controller;

import dekku.spring_dekku.domain.like.exception.LikeException;
import dekku.spring_dekku.domain.like.model.dto.LikeDto;
import dekku.spring_dekku.domain.like.service.LikeService;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.global.exception.AccessTokenException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "좋아요 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @Operation(summary = "게시글 좋아요")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 좋아요 성공",
                    content = @Content(schema = @Schema(implementation = LikeDto.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "토큰 만료 또는 위변조"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "사용자를 찾지 못했습니다"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "이미 좋아요를 눌렀습니다"
            )
    })
    @PostMapping("/{post_id}")
    public ResponseEntity likePost(@RequestHeader(name = "access") String token, @PathVariable(name = "post_id") Long postId) {
        LikeDto likeDto = null;
        try {
            likeDto = likeService.likePost(postId, token);
        } catch (AccessTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (LikeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(likeDto);
    }

    @Operation(summary = "게시글 좋아요 취소")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 좋아요 취소 완료",
                    content = @Content(schema = @Schema(implementation = LikeDto.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "토큰 만료 또는 위변조"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "사용자를 찾지 못했습니다"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "이미 좋아요를 취소했습니다"
            )
    })
    @DeleteMapping("/{post_id}")
    public ResponseEntity unlikePost(@RequestHeader(name = "access") String token, @PathVariable(name = "post_id") Long postId) {
        LikeDto likeDto = null;
        try {
            likeDto = likeService.unlikePost(postId, token);
        } catch (AccessTokenException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (LikeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(likeDto);
    }

}
