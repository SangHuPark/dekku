package dekku.spring_dekku.domain.product.service;

import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.FilePath;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;
import dekku.spring_dekku.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public CreateProductResponseDto saveProduct(CreateProductRequestDto requestDto) {
        FilePath filePath = new FilePath(requestDto.filePath());
        Product product = Product.builder()
                .name(requestDto.name())
                .price(requestDto.price())
                .imageUrl(requestDto.imageUrl())
                .salesLink(requestDto.salesLink())
                .category(requestDto.category())
                .filePath(filePath)
                .build();

        Product savedProduct = productRepository.save(product);

        ExistStatus existStatus = determineExistStatus(savedProduct.getFilePath().getPath());

        return new CreateProductResponseDto(
                savedProduct.getName(),
                savedProduct.getPrice(),
                savedProduct.getImageUrl(),
                savedProduct.getSalesLink(),
                existStatus,
                savedProduct.getCategory(),
                savedProduct.getFilePath().getPath()
        );
    }

    public List<CreateProductResponseDto> findAllProductDtos() {
        List<Product> products = productRepository.findAll();
        List<CreateProductResponseDto> productResponseDtos = new ArrayList<>();

        for (Product product : products) {
            ExistStatus existStatus = determineExistStatus(product.getFilePath().getPath());

            CreateProductResponseDto dto = new CreateProductResponseDto(
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getSalesLink(),
                    existStatus,
                    product.getCategory(),
                    product.getFilePath().getPath()
            );
            productResponseDtos.add(dto);
        }

        return productResponseDtos;
    }

    public List<CreateProductResponseDto> getProductsByCategory(Category category) {
        List<Product> products = productRepository.findProductsByCategory(category);
        List<CreateProductResponseDto> productResponseDtos = new ArrayList<>();

        for (Product product : products) {
            ExistStatus existStatus = determineExistStatus(product.getFilePath().getPath());

            CreateProductResponseDto dto = new CreateProductResponseDto(
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getSalesLink(),
                    existStatus,
                    product.getCategory(),
                    product.getFilePath().getPath()
            );
            productResponseDtos.add(dto);
        }

        return productResponseDtos;
    }

    // ExistStatus 처리 로직
    private ExistStatus determineExistStatus(String path) {
        return (path != null && !path.isEmpty()) ? ExistStatus.EXIST : ExistStatus.NOT_EXIST;
    }
}
