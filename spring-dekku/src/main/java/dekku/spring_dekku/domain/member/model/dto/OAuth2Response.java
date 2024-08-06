package dekku.spring_dekku.domain.member.model.dto;

public interface OAuth2Response {
    String getProvider();
    String getProviderId();
    String getName();
    String getEmail();
    String getImageUrl();
}
