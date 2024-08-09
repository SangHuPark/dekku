package dekku.spring_dekku.domain.comment.controller;

import dekku.spring_dekku.domain.comment.exception.CommentNotFoundException;
import dekku.spring_dekku.domain.comment.exception.UnauthorizedCommentDeleteException;
import dekku.spring_dekku.domain.comment.model.dto.CommentDto;
import dekku.spring_dekku.domain.comment.model.entity.Comment;
import dekku.spring_dekku.domain.comment.service.CommentService;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindByIdDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.global.model.dto.Success;
import dekku.spring_dekku.global.util.ResponseUtil;
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

import java.util.List;

@Tag(name = "댓글 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final DeskteriorPostService deskteriorPostService;

    @Operation(summary = "게시글의 댓글 전체 목록 불러오기")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "댓글 불러오기 성공",
                    content = @Content(schema = @Schema(implementation = List.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "댓글이 없습니다."
            )
    })
    @GetMapping("/{postId}")
    public ResponseEntity findDeskteriorPost(@PathVariable Long postId) {
        FindByIdDeskteriorPostResponseDto response = deskteriorPostService.findById(postId);

        return ResponseUtil.ok(
                Success.builder()
                        .data(response)
                        .build());
    }
    @Operation(summary = "댓글 작성")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "댓글 작성 성공",
                    content = @Content(schema = @Schema(implementation = Comment.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "인증되지 않은 사용자입니다."
            )
    })
    @PostMapping("/{postId}")
    public ResponseEntity<?> createComment(@PathVariable(name = "postId") Long postId, @RequestHeader("Access") String token, @RequestBody CommentDto commentDto) {
        try {
            commentService.createComment(postId, token, commentDto);
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "댓글 삭제")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "댓글 삭제 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "삭제하려는 댓글이 이미 없을 때"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "작성자가 아닌 다른 사용자가 댓글 삭제 시도"
            )
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable(name = "commentId") String commentId, @RequestHeader("Access") String token) {
        try {
            commentService.deleteComment(commentId, token);
            return ResponseEntity.status(HttpStatus.OK).body("댓글이 삭제되었습니다.");
        } catch (CommentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (UnauthorizedCommentDeleteException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

//    @PutMapping("/{commentId}")
//    public ResponseEntity<?> updateComment(@PathVariable(name = "commentId") String commentId, @RequestBody CommentDto commentDto) {
//
//    }
}
