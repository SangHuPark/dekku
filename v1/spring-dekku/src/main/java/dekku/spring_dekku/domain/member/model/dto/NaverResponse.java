package dekku.spring_dekku.domain.member.model.dto;

import java.util.Map;

public class NaverResponse implements OAuth2Response{
    private final Map<String, Object> attribute;

    public NaverResponse(Map<String, Object> attribute) {
        this.attribute = (Map<String, Object>) attribute.get("response");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    public Integer getAge(){
        return (Integer) attribute.get("age");
    }

    public String getGender(){
        return (String) attribute.get("gender");
    }

    @Override
    public String getImageUrl() {
        return (String) attribute.get("profile_image");
    }

}
