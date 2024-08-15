package dekku.spring_dekku.domain.product.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.request.RecommendRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreatePostProductMatchResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.FindProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.code.Category;

import java.util.List;

public interface ProductService {

    CreateProductResponseDto saveProduct(CreateProductRequestDto requestDto);

    List<CreateProductResponseDto> findAllProducts();

    List<CreateProductResponseDto> getProductsByCategory(Category category);

    List<CreatePostProductMatchResponseDto> findDeskteriorPostsByProductIds(RecommendRequestDto requestDto);

    List<CreatePostProductMatchResponseDto> findDeskteriorPostByDetails(Long postId);

    List<FindProductResponseDto> searchProductNamesByKeyword(String keyword);

    List<FindDeskteriorPostResponseDto> findPostsByProductName(String keyword);
}