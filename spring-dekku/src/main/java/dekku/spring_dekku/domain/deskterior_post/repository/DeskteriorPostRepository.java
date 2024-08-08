package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeskteriorPostRepository extends JpaRepository<DeskteriorPost, Long> {
}
