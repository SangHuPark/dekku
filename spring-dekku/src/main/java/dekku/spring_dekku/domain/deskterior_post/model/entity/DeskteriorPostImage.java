package dekku.spring_dekku.domain.deskterior_post.model.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "deskterior_posts_images")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DeskteriorPostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_posts_images_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_post_id")
    private DeskteriorPost deskteriorPost;

    private String imageUrl;

}
