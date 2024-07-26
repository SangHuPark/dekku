package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import jakarta.persistence.*;

@Getter
@Entity
@Table(name = "deskterior_images")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class DeskteriorImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_image_id")
    private Long id;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @OneToOne(mappedBy = "deskteriorImage", fetch = FetchType.LAZY)
    private DeskteriorPost deskteriorPost;

    @Builder
    public DeskteriorImage(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public DeskteriorImage updateImage(String imageUrl) {
        return this.toBuilder()
                .imageUrl(imageUrl != null ? imageUrl : this.imageUrl)
                .build();
    }
}
