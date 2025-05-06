package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.entity.RefreshEntity;
import dekku.spring_dekku.domain.member.repository.RefreshRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshRepository refreshRepository;
    @Transactional
    public void saveRefresh(String username, Long expireS, String refresh) {
        RefreshEntity refreshEntity = RefreshEntity.builder()
                .username(username)
                .refresh(refresh)
                .expiration(new Date(System.currentTimeMillis() + expireS).toString())
                .build();

        refreshRepository.save(refreshEntity);
    }
}
