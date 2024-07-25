package dekku.spring_dekku.domain.member.model.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class MemberDto {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String image_url;

}
