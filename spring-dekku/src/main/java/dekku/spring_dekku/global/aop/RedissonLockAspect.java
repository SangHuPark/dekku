//package dekku.spring_dekku.global.aop;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.reflect.MethodSignature;
//import org.redisson.api.RLock;
//import org.redisson.api.RedissonClient;
//import org.springframework.stereotype.Component;
//
//import java.lang.reflect.Method;
//import java.util.concurrent.TimeUnit;
//
//@Slf4j
//@Aspect
//@Component
//@RequiredArgsConstructor
//public class RedissonLockAspect {
//
//    private final RedissonClient redissonClient;
//
//    @Around("@annotation(dekku.spring_dekku.global.aop.DistributeLock)")
//    public void redissonLock(ProceedingJoinPoint joinPoint) throws Throwable {
//        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
//        Method method = signature.getMethod();
//        DistributeLock annotation = method.getAnnotation(DistributeLock.class);
//        String lockKey = method.getName() + CustomSpringELParser.getDynamicValue(signature.getParameterNames(), joinPoint.getArgs(), annotation.key());
//
//        RLock lock = redissonClient.getLock(lockKey);
//
//        try {
//            boolean lockable = lock.tryLock(annotation.waitTime(), annotation.leaseTime(), TimeUnit.MILLISECONDS);
//            if (!lockable) {
//                log.info("Lock 획득 실패={}", lockKey);
//                return;
//            }
//            log.info("로직 수행");
//            joinPoint.proceed();
//        } catch (InterruptedException e) {
//            log.info("에러 발생");
//            throw e;
//        } finally {
//            log.info("락 해제");
//            lock.unlock();
//        }
//
//    }
//
//}
