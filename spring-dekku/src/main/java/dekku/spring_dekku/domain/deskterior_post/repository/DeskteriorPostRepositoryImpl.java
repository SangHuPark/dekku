package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.type.Color;
import dekku.spring_dekku.domain.deskterior_post.model.type.Status;
import dekku.spring_dekku.domain.deskterior_post.model.type.Style;
import dekku.spring_dekku.domain.deskterior_post.model.type.Job;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
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
    public void updatePost(Long id, String title, String thumbnailUrl, String content, DeskteriorImage deskteriorImage, DeskteriorAttributes deskteriorAttributes, int viewCount, int likeCount, Status status) {
        DeskteriorPost existingPost = entityManager.find(DeskteriorPost.class, id);
        if (existingPost != null) {
            existingPost.updatePost(title, thumbnailUrl, content, new Timestamp(System.currentTimeMillis()), deskteriorImage, deskteriorAttributes, viewCount, likeCount, status);
        }
    }

    public List<DeskteriorPost> findPostsByFilters(Style style, Color color, Job job) {
        String jpql = "SELECT p FROM DeskteriorPost p JOIN p.deskteriorAttributes a WHERE 1=1";

        if (style != Style.NON_SELECT) {
            jpql += " AND a.style = :style";
        }

        if (color != Color.NON_SELECT) {
            jpql += " AND a.color = :color";
        }

        if (job != Job.NON_SELECT) {
            jpql += " AND a.job = :job";
        }

        TypedQuery<DeskteriorPost> query = entityManager.createQuery(jpql, DeskteriorPost.class);

        if (style != Style.NON_SELECT) {
            query.setParameter("style", style);
        }

        if (color != Color.NON_SELECT) {
            query.setParameter("color", color);
        }

        if (job != Job.NON_SELECT) {
            query.setParameter("job", job);
        }

        return query.getResultList();
    }
}