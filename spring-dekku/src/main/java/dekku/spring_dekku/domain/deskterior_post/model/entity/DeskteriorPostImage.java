package dekku.spring_dekku.domain.deskterior_post.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "deskterior_posts_images")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DeskteriorPostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_posts_images_id")
    private Long id;

    // DeskteriorPost Entity 내 putDeskteriorImage 에서 예외처리를 위한 @Setter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_post_id")
    private DeskteriorPost deskteriorPost;

    private String imageUrl;

    @Builder
    public DeskteriorPostImage(DeskteriorPost deskteriorPost, String imageUrl) {
        this.deskteriorPost = deskteriorPost;
        this.imageUrl = imageUrl;
    }

}
