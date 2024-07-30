package dekku.spring_dekku.domain.liked_post.repository;

import dekku.spring_dekku.domain.liked_post.model.entity.LikedPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikedPostRepository extends JpaRepository<LikedPost, Long> {
    List<LikedPost> findByUserId(Long userId);
    List<LikedPost> findByPostId(Long postId);
}