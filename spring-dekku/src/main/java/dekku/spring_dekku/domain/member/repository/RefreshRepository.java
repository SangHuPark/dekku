package dekku.spring_dekku.domain.member.repository;

import dekku.spring_dekku.domain.member.model.entity.RefreshEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {
    List<RefreshEntity> findByUsername(String username);
    Boolean existsByRefresh(String refresh);
    @Transactional
    void deleteByRefresh(String refresh);
}
