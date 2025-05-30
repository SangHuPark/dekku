package com.a306.dekku.global.util;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static com.a306.dekku.global.constant.StringFormat.TIMESTAMP_FORMAT;

public class ClockUtil {

    private static class ClockInstanceHolder {
        private static final Clock clock = Clock.systemDefaultZone();
    }

    public static LocalDateTime getLocalDateTime() {
        return LocalDateTime.now(ClockInstanceHolder.clock);
    }

    public static String getLocalDateTimeToString() {
        return getLocalDateTime().format(DateTimeFormatter.ofPattern(TIMESTAMP_FORMAT));
    }

    public static Date convertToDate(LocalDateTime now) {
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date getExpirationDate(LocalDateTime now, long expirationTime) {
        return Date.from(
                now.plusSeconds(expirationTime).atZone(ZoneId.systemDefault()).toInstant()
        );
    }

}
