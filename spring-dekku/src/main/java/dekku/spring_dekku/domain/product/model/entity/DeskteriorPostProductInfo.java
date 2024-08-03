package dekku.spring_dekku.domain.product.model.entity;

import dekku.spring_dekku.global.model.entity.DeskteriorPost;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "deskterior_posts_products_info")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DeskteriorPostProductInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deskterior_post_product_id")
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deskterior_post_id")
    private DeskteriorPost deskteriorPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Builder
    public DeskteriorPostProductInfo(DeskteriorPost deskteriorPost, Product product) {
        this.deskteriorPost = deskteriorPost;
        this.product = product;
    }

}
