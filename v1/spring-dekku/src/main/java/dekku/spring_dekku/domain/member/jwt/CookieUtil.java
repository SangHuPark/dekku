package dekku.spring_dekku.domain.member.jwt;

import jakarta.servlet.http.Cookie;

public class CookieUtil {
    public static Cookie createCookie(String key, String value, Long expiredS) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(Math.toIntExact(expiredS));
        return cookie;
    }
}
