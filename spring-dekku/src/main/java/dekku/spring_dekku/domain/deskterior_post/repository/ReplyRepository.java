package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.Reply;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends MongoRepository<Reply, ObjectId> {
    List<Reply> findByCommentId(ObjectId commentId);
}
