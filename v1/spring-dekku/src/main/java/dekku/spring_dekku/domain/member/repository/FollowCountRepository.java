package dekku.spring_dekku.domain.member.repository;

import dekku.spring_dekku.domain.follow.model.entity.Follow;
import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowCountRepository extends JpaRepository<Follow, Long> {
    int countByFromMember(Member fromMember);
    int countByToMember(Member toMember);
}
