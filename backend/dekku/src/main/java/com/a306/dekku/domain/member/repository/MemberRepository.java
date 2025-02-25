package com.a306.dekku.domain.member.repository;

import com.a306.dekku.domain.member.exception.NotExistMemberException;
import com.a306.dekku.domain.member.model.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    default Member getOrThrow(String providerId) {
        return findByProviderId(providerId).orElseThrow(NotExistMemberException::new);
    }

    @Query("SELECT m FROM Member m WHERE m.oAuth2Details.providerId = :providerId")
    Optional<Member> findByProviderId(@Param("providerId") String providerId);

}
