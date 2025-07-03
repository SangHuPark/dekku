package com.a306.dekku.domain.board.repository;

import com.a306.dekku.domain.board.exception.NotExistBoardException;
import com.a306.dekku.domain.board.model.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    default Board getOrThrow(Long id) {
        return findById(id)
                .orElseThrow(NotExistBoardException::new);
    }

    @Query("SELECT b.viewCount FROM Board b WHERE b.id = :boardId")
    Optional<Long> findViewCountById(@Param("boardId") Long boardId);

    @Modifying
    @Transactional
    @Query("UPDATE Board b SET b.viewCount = :viewCount WHERE b.id = :boardId")
    void updateViewCount(@Param("boardId") Long boardId,
                         @Param("viewCount") Long viewCount);

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
