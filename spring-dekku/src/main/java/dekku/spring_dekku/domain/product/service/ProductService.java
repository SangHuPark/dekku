package dekku.spring_dekku.domain.product.service;

import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.FilePath;
import dekku.spring_dekku.domain.product.model.entity.Product;
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
                .existStatus(requestDto.existStatus())
                .category(requestDto.category())
                .filePath(filePath)
                .build();

        Product savedProduct = productRepository.save(product);

        return new CreateProductResponseDto(
                savedProduct.getName(),
                savedProduct.getPrice(),
                savedProduct.getImageUrl(),
                savedProduct.getSalesLink(),
                savedProduct.getExistStatus(),
                savedProduct.getCategory(),
                savedProduct.getFilePath().getPath()
        );
    }

    public List<CreateProductResponseDto> findAllProductDtos() {
        List<Product> products = productRepository.findAll();
        List<CreateProductResponseDto> productResponseDtos = new ArrayList<>();

        for (Product product : products) {
            CreateProductResponseDto dto = new CreateProductResponseDto(
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getSalesLink(),
                    product.getExistStatus(),
                    product.getCategory(),
                    product.getFilePath().getPath()
            );
            productResponseDtos.add(dto);
        }

        return productResponseDtos;
    }
}
