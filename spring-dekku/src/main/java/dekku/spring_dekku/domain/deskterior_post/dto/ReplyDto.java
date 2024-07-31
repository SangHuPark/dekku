package dekku.spring_dekku.domain.deskterior_post.dto;

import lombok.Builder;
import lombok.Getter;

import org.springframework.data.annotation.Id;

import java.sql.Timestamp;

@Getter
@Builder
public class ReplyDto {
    @Id
    private Long userId;
    private String content;
    private Timestamp createdAt;
    private Timestamp modifiedAt;
}
