package dekku.spring_dekku.domain.dekku.repository;

import dekku.spring_dekku.domain.dekku.model.entity.ThreeDFile;
import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreeDFileRepository extends JpaRepository<ThreeDFile, Long> {

    ThreeDFile findByMemberId(Member memberId);

    List<ThreeDFile> findAllByMemberId(Member memberId);

}
