package dekku.spring_dekku.global.aop;

import java.lang.annotation.*;
import java.util.concurrent.TimeUnit;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DistributeLock {

    String key(); // Lock의 이름 (고유값)

    TimeUnit timeUnit() default TimeUnit.SECONDS;
    long waitTime() default 5000L; // Lock획득을 시도하는 최대 시간 (ms)
    long leaseTime() default 3000L; // 락을 획득한 후, 점유하는 최대 시간 (ms)

}
