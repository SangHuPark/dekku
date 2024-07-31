package dekku.spring_dekku.global.format;

import java.time.Duration;

public class NumberFormat {

    public static final Long PRE_SIGNED_URL_EXPIRATION_TIME = Duration.ofMinutes(5).toMillis();
}
