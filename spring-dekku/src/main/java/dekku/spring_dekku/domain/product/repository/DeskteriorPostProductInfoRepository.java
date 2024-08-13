package dekku.spring_dekku.domain.product.repository;

import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeskteriorPostProductInfoRepository extends JpaRepository<DeskteriorPostProductInfo, Long> {

    @Query("SELECT dpp.product.id FROM DeskteriorPostProductInfo dpp WHERE dpp.deskteriorPost.id = :postId")
    List<Long> findProductIdsByPostId(@Param("postId") Long postId);

    @Query("SELECT dpp.deskteriorPost.id FROM DeskteriorPostProductInfo dpp WHERE dpp.product.id IN :productIds")
    List<Long> findPostIdsByProductIds(@Param("productIds") List<Long> productIds);

    @Query("SELECT dpp.deskteriorPost.id AS postId, dpp.product.id AS productId " +
            "FROM DeskteriorPostProductInfo dpp " +
            "WHERE dpp.product.id IN :productIds " +
            "ORDER BY dpp.deskteriorPost.id")
    List<Object[]> findDeskteriorPostsWithProductIds(@Param("productIds") List<Long> productIds);
}
