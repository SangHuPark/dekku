package dekku.spring_dekku.domain.member.repository;

import dekku.spring_dekku.domain.member.model.entity.Follow;
import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    int countByFromMember(Member fromMember);
    int countByToMember(Member toMember);

    List<Follow> findByFromMember(Member fromMember);
    List<Follow> findByToMember(Member toMember);
    Optional<Follow> findByFromMemberAndToMember(Member fromMember, Member toMember);

}
