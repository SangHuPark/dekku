package dekku.spring_dekku.domain.product.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;
import dekku.spring_dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Table(name = "products")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    private String name; // 제품명

    private String price; // 제품 가격

    private String imageUrl; // 이미지 url

    private String description; // 제품 설명

    private String salesLink; // 파트너스 링크

    @Enumerated(EnumType.STRING)
    private ExistStatus existStatus; // 모델 존재 여부

    @Enumerated(EnumType.STRING)
    private Category category; // 제품 카테고리

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "file_path_id")
    @JsonManagedReference
    private FilePath filePath; // 내부 3D 파일 경로

    @Builder
    public Product(Long id, String name, String price, String imageUrl, String salesLink, String description, ExistStatus existStatus, Category category, FilePath filePath) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.salesLink = salesLink;
        this.description = description;
        this.existStatus = existStatus;
        this.category = category;
        this.filePath = filePath;
    }
}
