package dekku.spring_dekku.domain.comment.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    // MongoDB에서는 직접 참조 대신 ID를 사용하여 관계를 설정
    private Long deskteriorPostId;
}
