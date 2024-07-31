package dekku.spring_dekku.domain.liked_post.model.entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "members_liked_posts_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liked_id")
    private Long likedId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "post_id", nullable = false)
    private Long postId;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Builder
    public LikedPost(Long userId, Long postId, Timestamp createdAt) {
        this.userId = userId;
        this.postId = postId;
        this.createdAt = createdAt;
    }
}
