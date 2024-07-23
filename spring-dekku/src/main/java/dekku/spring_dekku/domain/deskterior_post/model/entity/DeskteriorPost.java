package dekku.spring_dekku.domain.deskterior_post.model.entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Getter
@Table(name = "deskterior_posts")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DeskteriorPost {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String thumbnailUrl;

    private String content;

    private Timestamp createdAt;

    private Timestamp modifiedAt;

    private Long deskteriorImageId;

    private Long userId;
}
