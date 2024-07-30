package dekku.spring_dekku.domain.deskterior_post.controller;

import dekku.spring_dekku.domain.deskterior_post.model.entity.Comment;
import dekku.spring_dekku.domain.deskterior_post.model.entity.Reply;
import dekku.spring_dekku.domain.deskterior_post.service.CommentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 1. 모든 댓글 조회
    @GetMapping("/all")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    // 2. 특정 게시물에 대한 댓글 조회
    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsByPostId(@RequestParam String postId) {
        List<Comment> comments = commentService.getComments(postId);
        return ResponseEntity.ok(comments);
    }

    // 3. ID로 댓글 조회
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable String id) {
        if (!ObjectId.isValid(id)) {
            return ResponseEntity.badRequest().build();
        }
        Comment comment = commentService.getCommentById(new ObjectId(id));
        return comment != null ? ResponseEntity.ok(comment) : ResponseEntity.notFound().build();
    }

    // 4. 댓글 생성
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.addComment(comment);
        return ResponseEntity.ok(savedComment);
    }

    // 5. 대댓글 추가
    @PostMapping("/{id}/replies")
    public ResponseEntity<Comment> addReply(@PathVariable String id, @RequestBody Reply reply) {
        if (!ObjectId.isValid(id)) {
            return ResponseEntity.badRequest().build();
        }
        ObjectId commentId = new ObjectId(id);
        Comment updatedComment = commentService.addReply(commentId, reply);
        return ResponseEntity.ok(updatedComment);
    }

    // 6. ID로 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        if (!ObjectId.isValid(id)) {
            return ResponseEntity.badRequest().build();
        }
        commentService.deleteCommentById(new ObjectId(id));
        return ResponseEntity.noContent().build();
    }
}
