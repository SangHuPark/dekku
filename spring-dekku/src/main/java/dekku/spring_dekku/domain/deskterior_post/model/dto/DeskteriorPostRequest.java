package dekku.spring_dekku.domain.deskterior_post.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeskteriorPostRequest {
    private DeskteriorPostDto deskteriorPostDto;
    private DeskteriorImageDto deskteriorImageDto;
}