package dekku.spring_dekku.domain.deskterior_post.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.type.Status;
import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "deskterior_posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class DeskteriorPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(length = 255)
    private String thumbnailUrl;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = true)
    private Timestamp modifiedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_image_id", nullable = true)
    private DeskteriorImage deskteriorImage;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Embedded
    private DeskteriorAttributes deskteriorAttributes;

    @Column(name = "view_count", nullable = false)
    private int viewCount;

    @Column(name = "like_count", nullable = false)
    private int likeCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Builder
    public DeskteriorPost(String title, String thumbnailUrl, String content, Timestamp createdAt, Timestamp modifiedAt, DeskteriorImage deskteriorImage, DeskteriorAttributes deskteriorAttributes, int viewCount, int likeCount, Status status) {
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.content = content;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.deskteriorImage = deskteriorImage;
        this.deskteriorAttributes = deskteriorAttributes;
        this.viewCount = viewCount;
        this.likeCount = likeCount;
        this.status = status;
    }

    public DeskteriorPost updatePost(String title, String thumbnailUrl, String content, Timestamp modifiedAt, DeskteriorImage deskteriorImage, DeskteriorAttributes deskteriorAttributes, int viewCount, int likeCount, Status status) {
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.content = content;
        this.modifiedAt = modifiedAt;
        this.deskteriorImage = deskteriorImage;
        this.deskteriorAttributes = deskteriorAttributes;
        this.viewCount = viewCount;
        this.likeCount = likeCount;
        this.status = status;
        return this;
    }
}
