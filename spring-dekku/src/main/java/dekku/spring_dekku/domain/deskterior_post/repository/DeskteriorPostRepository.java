package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeskteriorPostRepository extends JpaRepository<DeskteriorPost, Long> {
    List<DeskteriorPost> findByMemberId(Long memberId);
    @Query(value = "SELECT D FROM DeskteriorPost D ORDER BY D.likeCount DESC LIMIT 3")
    List<DeskteriorPost> findTopPosts();

    List<DeskteriorPost> findByCreatedAtAfter(LocalDateTime createdAt);
}
