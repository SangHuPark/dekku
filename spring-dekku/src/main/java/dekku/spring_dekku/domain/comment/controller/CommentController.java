package dekku.spring_dekku.domain.comment.controller;

import dekku.spring_dekku.domain.comment.model.dto.CommentDto;
import dekku.spring_dekku.domain.comment.model.entity.Comment;
import dekku.spring_dekku.domain.comment.service.CommentService;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
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
    public ResponseEntity<List<Comment>> getComments(@PathVariable(name = "postId") Long postId) {
        List<Comment> comments = commentService.findByPostId(postId);
        if (comments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(comments);
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
        commentService.createComment(postId, token, commentDto);

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
        commentService.deleteComment(commentId, token);

        return ResponseEntity.status(HttpStatus.OK).body("댓글이 삭제되었습니다.");
    }

//    @PutMapping("/{commentId}")
//    public ResponseEntity<?> updateComment(@PathVariable(name = "commentId") String commentId, @RequestBody CommentDto commentDto) {
//
//    }
}
