package com.a306.dekku.external.redis.service.lock;

import com.a306.dekku.external.redis.exception.RedissonLockException;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

import static com.a306.dekku.global.constant.Number.REDISSON_LOCK_LEASE_TIME_MS;
import static com.a306.dekku.global.constant.Number.REDISSON_LOCK_WAIT_TIME_MS;

@RequiredArgsConstructor
@Service
public class RedissonLockServiceImpl implements RedissonLockService {

    private final RedissonClient redissonClient;

    @Override
    public <T> T executeWithLock(String lockKey, Callable<T> task) {
        RLock lock = redissonClient.getLock(lockKey);

        try {
            boolean isLocked = lock.tryLock(
                    REDISSON_LOCK_WAIT_TIME_MS,
                    REDISSON_LOCK_LEASE_TIME_MS,
                    TimeUnit.MILLISECONDS
            );

            if (!isLocked) {
                throw new RedissonLockException();
            }

            return task.call();

        } // 그 외 예외
        catch (Exception e) {
            throw new RuntimeException("Redisson 락 처리 중 예외 발생", e);
        } finally {
            if (lock.isHeldByCurrentThread()) {
                try {
                    lock.unlock();
                } catch (IllegalMonitorStateException ignored) {
                    // 락 이미 해제된 상태일 수 있음 = 무시
                }
            }
        }
    }

}
