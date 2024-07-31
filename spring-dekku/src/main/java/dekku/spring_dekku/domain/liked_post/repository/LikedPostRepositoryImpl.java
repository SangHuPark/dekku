package dekku.spring_dekku.domain.liked_post.repository;

import dekku.spring_dekku.domain.liked_post.model.entity.LikedPost;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;

@Repository
public class LikedPostRepositoryImpl implements LikedPostRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<LikedPost> findCustomByUserId(Long userId) {
        TypedQuery<LikedPost> query = entityManager.createQuery(
                "SELECT sp FROM LikedPost sp WHERE sp.userId = :userId", LikedPost.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    @Override
    public List<LikedPost> findCustomByPostId(Long postId) {
        TypedQuery<LikedPost> query = entityManager.createQuery(
                "SELECT sp FROM LikedPost sp WHERE sp.postId = :postId", LikedPost.class);
        query.setParameter("postId", postId);
        return query.getResultList();
    }
}
