package dekku.spring_dekku.domain.liked_post.repository;

import dekku.spring_dekku.domain.liked_post.model.entity.LikedPost;

import java.util.List;

public interface LikedPostRepositoryCustom {
    List<LikedPost> findCustomByUserId(Long userId);
    List<LikedPost> findCustomByPostId(Long postId);
}
