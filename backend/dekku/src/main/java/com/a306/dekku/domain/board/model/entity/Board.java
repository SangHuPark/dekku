package com.a306.dekku.domain.board.model.entity;

import com.a306.dekku.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

@Table(name = "boards")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(nullable = false, length = 35)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Long viewCount;

    @Column(nullable = false)
    private Long commentCount;

    @Column(nullable = false)
    private Long likeCount;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardProduct> boardProducts = new ArrayList<>();

    @Builder
    public Board(String title, String content) {
        this.title = title;
        this.content = content;
        this.viewCount = 0L;
        this.commentCount = 0L;
        this.likeCount = 0L;
    }

    // boards:products 연관관계 편의 메서드
    public void addBoardProduct(BoardProduct boardProduct) {
        boardProducts.add(boardProduct);
        boardProduct.setBoard(this);
    }

    // 조회수 증가 메서드
    public void increaseViewCount() {
        this.viewCount += 1;
    }

}
