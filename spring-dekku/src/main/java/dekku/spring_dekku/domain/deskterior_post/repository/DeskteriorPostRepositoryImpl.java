package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeskteriorPostRepositoryImpl implements DeskteriorPostRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DeskteriorPost> findPostsByTitleContaining(String keyword) {
        String jpql = "SELECT p FROM DeskteriorPost p WHERE p.title LIKE :keyword";
        TypedQuery<DeskteriorPost> query = entityManager.createQuery(jpql, DeskteriorPost.class);
        query.setParameter("keyword", "%" + keyword + "%");
        return query.getResultList();
    }
}
