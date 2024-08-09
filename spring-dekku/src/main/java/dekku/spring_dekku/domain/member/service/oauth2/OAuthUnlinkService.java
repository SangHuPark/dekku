package dekku.spring_dekku.domain.member.service.oauth2;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OAuthUnlinkService {

    @Value("${spring.security.oauth2.client.provider.kakao.unlink-uri}")
    private String KAKAO_URL;
    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String NAVER_URL;
    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String NAVER_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String NAVER_CLIENT_SECRET;

    public void kakaoUnlink(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Object> entity = new HttpEntity<>("", headers);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(KAKAO_URL, HttpMethod.POST, entity, String.class);
    }

    public void naverUnlink(String accessToken) {
        String url = NAVER_URL +
                "?service_provider=NAVER" +
                "&grant_type=delete" +
                "&client_id=" + NAVER_CLIENT_ID +
                "&client_secret=" + NAVER_CLIENT_SECRET +
                "&access_token=" + accessToken;

        RestTemplate restTemplate = new RestTemplate();
        UnlinkResponse response = restTemplate.getForObject(url, UnlinkResponse.class);

        if (response == null || !"success".equalsIgnoreCase(response.getResult())) {
            throw new RuntimeException("네이버 연동 해제 실패");
        }
    }

    //Naver Response Data
    @Getter
    @RequiredArgsConstructor
    public static class UnlinkResponse {
        @JsonProperty("access_token")
        private final String accessToken;
        private final String result;
    }
}
