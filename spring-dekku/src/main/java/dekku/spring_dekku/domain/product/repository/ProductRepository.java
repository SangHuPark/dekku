package dekku.spring_dekku.domain.product.repository;

import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByCategory(@Param("category") Category category);
}
