package com.a306.dekku.domain.product.model.entity;

import com.a306.dekku.domain.product.model.entity.enums.ProductType;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "products")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(nullable = false, length = 100)
    private String name; // 제품명

    @Column(nullable = false)
    private String price; // 제품 가격

    @Column(name = "thumbnail_image_url")
    private String thumbnailImageUrl; // 이미지 url

    @Column(columnDefinition = "TEXT")
    private String description; // 제품 설명

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private ProductType category;

    @Builder
    public Product(Long id, String name, String price, String thumbnailImageUrl, String description, ProductType category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.thumbnailImageUrl = thumbnailImageUrl;
        this.description = description;
        this.category = category;
    }

}
