package dekku.spring_dekku.domain.stored_post.repository;

import dekku.spring_dekku.domain.stored_post.model.entity.StoredPost;

import java.util.List;

public interface StoredPostRepositoryCustom {
    List<StoredPost> findByUserIdCustom(Long userId);
}
