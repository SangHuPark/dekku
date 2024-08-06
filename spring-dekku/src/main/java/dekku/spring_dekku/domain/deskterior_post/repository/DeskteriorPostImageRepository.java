package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeskteriorPostImageRepository extends JpaRepository<DeskteriorPostImage, Long> {
    List<DeskteriorPostImage> findByDeskteriorPostId(Long memberId);
}
