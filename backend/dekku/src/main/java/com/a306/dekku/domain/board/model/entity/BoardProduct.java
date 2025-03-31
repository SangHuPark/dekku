package com.a306.dekku.domain.board.model.entity;

import com.a306.dekku.domain.product.model.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "boards_products_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class BoardProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public static BoardProduct of(Board board, Product product) {
        return BoardProduct.builder()
                .board(board)
                .product(product)
                .build();
    }

}
