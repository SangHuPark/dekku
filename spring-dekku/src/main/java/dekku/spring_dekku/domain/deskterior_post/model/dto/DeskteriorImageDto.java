package dekku.spring_dekku.domain.deskterior_post.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DeskteriorImageDto {
    private Long id;
    private String imageUrl;
}
