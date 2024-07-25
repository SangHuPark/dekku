package dekku.spring_dekku.domain.member.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateMemberResponseDto {

    private String email;
    private String nickname;
    private String image_url;

}
