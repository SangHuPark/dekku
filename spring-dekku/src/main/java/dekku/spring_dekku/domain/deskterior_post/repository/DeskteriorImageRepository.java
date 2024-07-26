package dekku.spring_dekku.domain.deskterior_post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;

public interface DeskteriorImageRepository extends JpaRepository<DeskteriorImage, Long> {
}