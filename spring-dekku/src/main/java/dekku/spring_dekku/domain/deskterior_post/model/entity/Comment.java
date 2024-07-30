package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
public class Comment {
    @Id
    private ObjectId id;
    private String postId;
    private String author;
    private String content;
    private Date createdAt;
    @Builder.Default
    private List<Reply> replies = new ArrayList<>();

    @Builder
    public Comment(String postId, String author, String content, Date createdAt, List<Reply> replies) {
        this.postId = postId;
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
        this.replies = replies != null ? replies : new ArrayList<>();
    }
}
