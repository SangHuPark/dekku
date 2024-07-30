package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.entity.Comment;
import dekku.spring_dekku.domain.deskterior_post.model.entity.Reply;
import dekku.spring_dekku.domain.deskterior_post.repository.CommentRepository;
import dekku.spring_dekku.domain.deskterior_post.repository.ReplyRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, ReplyRepository replyRepository) {
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
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
                .replies(comment.getReplies())
                .build();
        return commentRepository.save(newComment);
    }

    // 5. 대댓글 추가
    public Comment addReply(ObjectId commentId, Reply reply) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));

        Reply newReply = Reply.builder()
                .author(reply.getAuthor())
                .content(reply.getContent())
                .createdAt(new Date())
                .build();

        replyRepository.save(newReply);
        comment.getReplies().add(newReply);
        return commentRepository.save(comment);
    }

    // 6. ID로 댓글 삭제
    public void deleteCommentById(ObjectId id) {
        commentRepository.deleteById(id);
    }
}
