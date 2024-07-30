package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Reply {
    @Id
    private ObjectId id;
    private String author;
    private String content;
    private Date createdAt;

    @Builder
    public Reply(String author, String content, Date createdAt) {
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
    }
}
