package dekku.spring_dekku.domain.deskterior_post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
public class DeskteriorImageDto {
    private String imageUrl;

    public DeskteriorImageDto(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
