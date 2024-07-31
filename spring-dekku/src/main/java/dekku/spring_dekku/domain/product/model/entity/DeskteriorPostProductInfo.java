package dekku.spring_dekku.domain.product.model.entity;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.member.model.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "deskterior_posts_products_info")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DeskteriorPostProductInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_post_product_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_post_id")
    private DeskteriorPost deskteriorPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

}
