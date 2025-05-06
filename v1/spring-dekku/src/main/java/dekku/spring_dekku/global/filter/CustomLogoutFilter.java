//package dekku.spring_dekku.global.filter;
//
//import dekku.spring_dekku.domain.member.jwt.CookieUtil;
//import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
//import dekku.spring_dekku.domain.member.repository.RefreshRepository;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.ServletRequest;
//import jakarta.servlet.ServletResponse;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.filter.GenericFilterBean;
//
//import java.io.IOException;
//import java.util.Arrays;
//
///**
// * 로그아웃 필터
// * refresh 토큰 만료
// */
//@RequiredArgsConstructor
//@Slf4j
//public class CustomLogoutFilter extends GenericFilterBean {
//
//    private final JwtTokenProvider jwtTokenProvider;
//    private final RefreshRepository refreshRepository;
//
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
//    }
//
//    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//        String requestURI = request.getRequestURI();
//        // uri check
//        if (!requestURI.matches("^\\/api/logout$")) {
//            log.warn(request.getRequestURI() + " is not");
//            chain.doFilter(request, response);
//            return;
//        }
//        // method check
//        String requestMethod = request.getMethod();
//        if (!requestMethod.equals("POST")) {
//            log.warn("Http method is not POST");
//            chain.doFilter(request, response);
//            return;
//        }
//
//        // refresh token validation
//        String refresh = null;
//        Cookie[] cookies = request.getCookies();
//
//        refresh = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals("refresh"))
//                .findFirst().get().getValue();
//
//        log.info("refresh = " + refresh);
//
//        // refresh token null
//        if(refresh == null){
//            log.warn("refresh is null");
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }
//        String category = jwtTokenProvider.getCategory(refresh);
//
//        // not refresh token
//        if(!category.equals("refresh")){
//            log.warn("request refresh is not refresh");
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }
//
//        Boolean isExist = refreshRepository.existsByRefresh(refresh);
//
//        // not exist in DB
//        if(!isExist){
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }
//
//        // logout
//        refreshRepository.deleteByRefresh(refresh);
//
//        Cookie cookie = CookieUtil.createCookie("refresh", null, 0L);
//        response.addCookie(cookie);
//        response.setStatus(HttpServletResponse.SC_OK);
//    }
//}
