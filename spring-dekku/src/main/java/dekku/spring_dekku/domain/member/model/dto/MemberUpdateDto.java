package dekku.spring_dekku.domain.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberUpdateDto {

    private String nickname;
    private Integer ageRange;
    private String gender;

}
