package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class DeskteriorPostRepositoryImpl implements DeskteriorPostRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DeskteriorPost> findByTitleContaining(String keyword) {
        String jpql = "SELECT p FROM DeskteriorPost p WHERE p.title LIKE :keyword";
        TypedQuery<DeskteriorPost> query = entityManager.createQuery(jpql, DeskteriorPost.class);
        query.setParameter("keyword", "%" + keyword + "%");
        return query.getResultList();
    }

    @Override
    @Transactional
    public void updatePost(Long id, String title, String thumbnailUrl, String content, DeskteriorImage deskteriorImage) {
        DeskteriorPost existingPost = entityManager.find(DeskteriorPost.class, id);
        if (existingPost != null) {
            DeskteriorPost updatedPost = existingPost.updatePost(title, thumbnailUrl, content, new Timestamp(System.currentTimeMillis()), deskteriorImage);
            entityManager.merge(updatedPost);
        }
    }
}
