package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Table(name = "deskterior_posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    private DeskteriorPost(String title, String thumbnailUrl, String content, Timestamp createdAt, Timestamp modifiedAt, DeskteriorImage deskteriorImage, Long userId) {
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.content = content;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.deskteriorImage = deskteriorImage;
        this.userId = userId;
    }

    public static DeskteriorPost of(String title, String thumbnailUrl, String content, Timestamp createdAt, Timestamp modifiedAt, DeskteriorImage deskteriorImage, Long userId) {
        return builder()
                .title(title)
                .thumbnailUrl(thumbnailUrl)
                .content(content)
                .createdAt(createdAt)
                .modifiedAt(modifiedAt)
                .deskteriorImage(deskteriorImage)
                .userId(userId)
                .build();
    }
}
