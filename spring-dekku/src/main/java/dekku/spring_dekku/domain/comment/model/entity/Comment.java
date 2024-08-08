package dekku.spring_dekku.domain.comment.model.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
@Setter @Getter
public class Comment{
    @Id
    private String commentId;
    @NotBlank
    private Long postId;
    @NotBlank
    private Long memberId;
    @NotBlank
    private String content;
}
