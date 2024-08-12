package dekku.spring_dekku.domain.like.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.like.model.entity.Like;
import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByMember(Member member);
    boolean existsByMemberAndDeskteriorPost(Member member, DeskteriorPost post);
    @Modifying
    @Query(value = "UPDATE DeskteriorPost d SET d.likeCount = d.likeCount + 1 where d.id=:id")
    void upCount(Long id);
    @Modifying
    @Query(value = "UPDATE DeskteriorPost d SET d.likeCount = d.likeCount - 1 where d.id=:id")
    void downCount(Long id);

}