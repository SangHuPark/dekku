package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, ObjectId> {
    List<Comment> findByPostId(String postId);
    Optional<Comment> findByRepliesId(ObjectId replyId);
}
