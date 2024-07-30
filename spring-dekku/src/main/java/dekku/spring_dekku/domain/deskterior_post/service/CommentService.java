package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.entity.Comment;
import dekku.spring_dekku.domain.deskterior_post.model.entity.Reply;
import dekku.spring_dekku.domain.deskterior_post.repository.CommentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // 1. 모든 댓글 조회
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // 2. 특정 게시물에 대한 댓글 조회
    public List<Comment> getComments(String postId) {
        return commentRepository.findByPostId(postId);
    }

    // 3. ID로 댓글 조회
    public Comment getCommentById(ObjectId id) {
        return commentRepository.findById(id).orElse(null);
    }

    // 4. 댓글 생성
    public Comment addComment(Comment comment) {
        Comment newComment = Comment.builder()
                .postId(comment.getPostId())
                .author(comment.getAuthor())
                .content(comment.getContent())
                .createdAt(new Date())
                .build();
        return commentRepository.save(newComment);
    }

    // 5. 대댓글 추가
    public Reply addReply(ObjectId commentId, Reply reply) {
        // 주어진 commentId를 사용하여 댓글(Comment)을 데이터베이스에서 찾습니다.
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));

        // 새로운 ObjectId를 생성하여 대댓글(Reply) 객체를 빌드합니다.
        ObjectId replyId = new ObjectId();
        Reply newReply = Reply.builder()
                .id(replyId)
                .author(reply.getAuthor())
                .content(reply.getContent())
                .createdAt(new Date())
                .build();

        // 댓글(Comment) 객체의 replies 리스트에 새로 생성된 대댓글을 추가합니다.
        comment.getReplies().add(newReply);

        // 변경된 댓글(Comment) 객체를 데이터베이스에 저장합니다.
        commentRepository.save(comment);

        // 새로 생성된 대댓글(Reply) 객체를 반환합니다.
        return newReply;
    }

    // 6. ID로 댓글 삭제
    public void deleteCommentById(ObjectId id) {
        commentRepository.deleteById(id);
    }

    // 7. ID로 대댓글 삭제
    public Comment deleteReply(ObjectId replyId) {
        Comment comment = commentRepository.findByRepliesId(replyId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found for reply id: " + replyId));

        comment.getReplies().removeIf(r -> r.getId().equals(replyId));
        return commentRepository.save(comment);
    }
}
