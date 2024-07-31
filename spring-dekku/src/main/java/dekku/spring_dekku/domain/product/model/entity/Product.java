package dekku.spring_dekku.domain.product.model.entity;

import dekku.spring_dekku.domain.member.model.entity.Like;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "products")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    private String name;

    private int price;

    private String imageUrl;

    private String salesLink;

    @Enumerated(EnumType.STRING)
    private ExistStatus existStatus;

    @Enumerated(EnumType.STRING)
    private Category category;

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "file_path_id")
    private FilePath filePath;

    @OneToMany(mappedBy = "product")
    private List<DeskteriorPostProductInfo> deskteriorPostProductInfos = new ArrayList<>();
}
