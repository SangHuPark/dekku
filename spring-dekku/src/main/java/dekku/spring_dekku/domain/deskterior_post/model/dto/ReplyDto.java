package dekku.spring_dekku.domain.deskterior_post.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class ReplyDto {
    @Id
    private String commentId;
    private Long userId;
    private String content;
    private Timestamp createdAt;
    private Timestamp modifiedAt;
}
