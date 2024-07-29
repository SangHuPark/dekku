package dekku.spring_dekku.domain.stored_post.repository;

import dekku.spring_dekku.domain.stored_post.model.entity.StoredPost;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;

@Repository
public class StoredPostRepositoryImpl implements StoredPostRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<StoredPost> findByUserIdCustom(Long userId) {
        TypedQuery<StoredPost> query = entityManager.createQuery(
                "SELECT sp FROM StoredPost sp WHERE sp.userId = :userId", StoredPost.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}
