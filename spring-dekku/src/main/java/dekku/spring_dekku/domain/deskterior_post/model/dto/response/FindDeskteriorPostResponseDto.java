package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public record FindDeskteriorPostResponseDto(

        @JsonSerialize(using = ToStringSerializer.class)
        Long postId,

        @JsonSerialize(using = ToStringSerializer.class)
        Long memberId
) {

}
