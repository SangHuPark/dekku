package dekku.spring_dekku.domain.member.model.dto;

import lombok.AllArgsConstructor;

import java.util.Map;
@AllArgsConstructor
public class KakaoResponse implements OAuth2Response {
    private final Map<String, Object> attribute;

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        return (String) ((Map) attribute.get("kakao_account")).get("email");
    }

    @Override
    public String getName() {
        return (String) ((Map) attribute.get("properties")).get("nickname");
    }

    @Override
    public String getImageUrl() {
        return (String) ((Map) attribute.get("properties")).get("profile_image");
    }

//    @Override
//    public String getName() {
//        return attribute.get("profile_image").toString();
//    }
//
//    @Override
//    public String getEmail() {
//        return attribute.get("account_email").toString();
//    }

}
