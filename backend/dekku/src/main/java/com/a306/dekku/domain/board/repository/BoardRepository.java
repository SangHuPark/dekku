package com.a306.dekku.domain.board.repository;

import com.a306.dekku.domain.board.model.entity.Board;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("""
        SELECT DISTINCT b
        FROM Board b
        LEFT JOIN b.boardProducts bp
        LEFT JOIN bp.product p
        WHERE b.title LIKE %:keyword% OR p.name LIKE %:keyword%
    """)
    List<Board> findByTitleOrProductNameContaining(@Param("keyword") String keyword);

    @Query("SELECT b FROM Board b LEFT JOIN FETCH b.boardProducts bp LEFT JOIN FETCH bp.product")
    List<Board> findAllWithProducts();

}
