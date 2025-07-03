package com.a306.dekku.external.redis.scheduler;

import com.a306.dekku.domain.board.repository.BoardRepository;
import com.a306.dekku.external.redis.service.viewCounter.RedisViewCounter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class RedisViewCountSyncScheduler {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisViewCounter redisViewCounter;
    private final BoardRepository boardRepository;

    private static final String REDIS_KEY_PREFIX = "board:viewcount:";

    @Scheduled(cron = "0 */5 * * * ?")
    public void syncViewCountToDb() {
        /* v2 sync
        Set<String> keys = redisTemplate.keys(REDIS_KEY_PREFIX + "*");
        if (keys == null) return;

        for (String key : keys) {
            try {
                Long boardId = Long.parseLong(key.replace(REDIS_KEY_PREFIX, ""));
                String count = redisTemplate.opsForValue().get(key);
                if (count != null) {
                    boardRepository.updateViewCount(boardId, Long.parseLong(count));
                }
            } catch (NumberFormatException e) {
                // 잘못된 키 형식이면 무시
            }
        }*/

        Map<Object, Object> logs = redisViewCounter.findByHash("board:viewCount:");
        logs.forEach((key, value) -> {
            Long boardId = Long.parseLong((String) key);
            Long count = ((Number) value).longValue();
            boardRepository.updateViewCount(boardId, count);
            redisViewCounter.deleteByKey("board:viewCount:", boardId);
        });
    }
}