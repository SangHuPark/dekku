package dekku.spring_dekku.domain.comment.repository;

import dekku.spring_dekku.domain.comment.model.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(Long postId);
}
