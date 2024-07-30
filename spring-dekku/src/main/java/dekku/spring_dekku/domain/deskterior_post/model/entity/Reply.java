package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Document(collection = "replies")
public class Reply {
    @Id
    private ObjectId id;
    private ObjectId commentId; // 이 필드를 추가합니다.
    private String author;
    private String content;
    private Date createdAt;

    @Builder
    public Reply(ObjectId commentId, String author, String content, Date createdAt) {
        this.commentId = commentId;
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
    }
}
