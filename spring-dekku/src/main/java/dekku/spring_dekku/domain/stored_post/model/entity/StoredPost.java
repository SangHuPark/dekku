package dekku.spring_dekku.domain.stored_post.model.entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "members_stored_posts_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class StoredPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stored_id")
    private Long storedId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "post_id", nullable = false)
    private Long postId;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Builder
    public StoredPost(Long userId, Long postId, Timestamp createdAt) {
        this.userId = userId;
        this.postId = postId;
        this.createdAt = createdAt;
    }
}
