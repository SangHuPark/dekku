package dekku.spring_dekku.domain.stored_post.repository;

import dekku.spring_dekku.domain.stored_post.model.entity.StoredPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoredPostRepository extends JpaRepository<StoredPost, Long>, StoredPostRepositoryCustom {
    List<StoredPost> findByUserId(Long userId);
    List<StoredPost> findByPostId(Long postId);
}
