package dekku.spring_dekku.domain.product.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.product.model.dto.request.CreateProductRequestDto;
import dekku.spring_dekku.domain.product.model.dto.request.RecommendRequestDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreatePostProductMatchResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.dto.response.FindProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.domain.product.model.entity.FilePath;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;
import dekku.spring_dekku.domain.product.repository.DeskteriorPostProductInfoRepository;
import dekku.spring_dekku.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductServiceimpl implements ProductService {

    private final ProductRepository productRepository;
    private final DeskteriorPostProductInfoRepository deskteriorPostProductInfoRepository;
    private final DeskteriorPostRepository deskteriorPostRepository;

    @Transactional
    public CreateProductResponseDto saveProduct(CreateProductRequestDto requestDto) {
        FilePath filePath = new FilePath(requestDto.filePath());
        Product product = Product.builder()
                .name(requestDto.name())
                .price(requestDto.price())
                .imageUrl(requestDto.imageUrl())
                .scale(requestDto.scale())
                .description(requestDto.description())
                .category(requestDto.category())
                .filePath(filePath)
                .build();

        Product savedProduct = productRepository.save(product);

        ExistStatus existStatus = determineExistStatus(savedProduct.getFilePath().getPath());

        return new CreateProductResponseDto(
                savedProduct.getId(),
                savedProduct.getName(),
                savedProduct.getPrice(),
                savedProduct.getImageUrl(),
                savedProduct.getScale(),
                savedProduct.getDescription(),
                existStatus,
                savedProduct.getCategory(),
                savedProduct.getFilePath().getPath()
        );
    }

    public List<CreateProductResponseDto> findAllProductDtos() {
        List<Product> products = productRepository.findAllProductsOrderByCreatedAtDesc();
        List<CreateProductResponseDto> productResponseDtos = new ArrayList<>();

        for (Product product : products) {
            ExistStatus existStatus = determineExistStatus(product.getFilePath().getPath());

            CreateProductResponseDto dto = new CreateProductResponseDto(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getScale(),
                    product.getDescription(),
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
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getScale(),
                    product.getDescription(),
                    existStatus,
                    product.getCategory(),
                    product.getFilePath().getPath()
            );
            productResponseDtos.add(dto);
        }

        return productResponseDtos;
    }

    public List<CreatePostProductMatchResponseDto> findDeskteriorPostsByProductIds(RecommendRequestDto requestDto) {
        List<Long> productIds = requestDto.productIds();  // RecommendRequestDto로부터 productIds를 받아옴

        if (productIds == null || productIds.isEmpty()) {
            throw new IllegalArgumentException("제품 ID 리스트가 비어 있습니다.");
        }

        List<Object[]> results = deskteriorPostProductInfoRepository.findDeskteriorPostsWithProductIds(productIds);

        if (results.isEmpty()) {
            throw new NoSuchElementException("관련 게시물이 존재하지 않습니다.");
        }

        PriorityQueue<CreatePostProductMatchResponseDto> pq = new PriorityQueue<>(
                (a, b) -> b.matchingProductIds().size() - a.matchingProductIds().size()
        );

        Map<Long, List<Long>> postIdToProductIdsMap = new HashMap<>();

        // 결과를 순회하며 각 게시물에 대한 매칭 제품 정보를 맵에 추가
        for (Object[] result : results) {
            Long relatedPostId = (Long) result[0];
            Long relatedProductId = (Long) result[1];

            if (!postIdToProductIdsMap.containsKey(relatedPostId)) {
                postIdToProductIdsMap.put(relatedPostId, new ArrayList<>());
            }
            postIdToProductIdsMap.get(relatedPostId).add(relatedProductId);
        }

        // 맵의 데이터를 기반으로 우선순위 큐에 추가
        for (Map.Entry<Long, List<Long>> entry : postIdToProductIdsMap.entrySet()) {
            Long relatedPostId = entry.getKey();
            DeskteriorPost relatedPost = deskteriorPostRepository.findById(relatedPostId)
                    .orElseThrow(() -> new NoSuchElementException("게시물을 찾을 수 없습니다: " + relatedPostId));

            CreatePostProductMatchResponseDto dto = new CreatePostProductMatchResponseDto(
                    relatedPostId,
                    entry.getValue(),
                    relatedPost.getMember().getNickname(),
                    relatedPost.getMember().getImageUrl(),
                    relatedPost.getTitle(),
                    relatedPost.getContent(),
                    relatedPost.getThumbnailUrl(),
                    relatedPost.getViewCount(),
                    relatedPost.getLikeCount(),
                    relatedPost.getDeskteriorAttributes()
            );

            pq.add(dto);
        }

        // 우선순위 큐에서 결과를 꺼내어 리스트로 변환
        List<CreatePostProductMatchResponseDto> postProductMatches = new ArrayList<>();
        while (!pq.isEmpty()) {
            postProductMatches.add(pq.poll());
        }

        return postProductMatches;
    }


    public List<CreatePostProductMatchResponseDto> findDeskteriorPostByDetails(Long postId) {
        List<Long> productIds = deskteriorPostProductInfoRepository.findProductIdsByPostId(postId);
        if (productIds.isEmpty()) {
            throw new NoSuchElementException("해당 게시물에 포함된 제품이 없습니다: " + postId);
        }

        List<Object[]> results = deskteriorPostProductInfoRepository.findDeskteriorPostsWithProductIds(productIds);

        if (results.isEmpty()) {
            throw new NoSuchElementException("관련 게시물이 존재하지 않습니다.");
        }

        PriorityQueue<CreatePostProductMatchResponseDto> pq = new PriorityQueue<>(
                (a, b) -> b.matchingProductIds().size() - a.matchingProductIds().size()
        );

        Map<Long, List<Long>> postIdToProductIdsMap = new HashMap<>();

        // 결과를 순회하며 각 게시물에 대한 매칭 제품 정보를 맵에 추가
        for (Object[] result : results) {
            Long relatedPostId = (Long) result[0];
            Long relatedProductId = (Long) result[1];

            if (relatedPostId.equals(postId)) continue;

            if (!postIdToProductIdsMap.containsKey(relatedPostId)) {
                postIdToProductIdsMap.put(relatedPostId, new ArrayList<>());
            }
            postIdToProductIdsMap.get(relatedPostId).add(relatedProductId);
        }

        // 맵의 데이터를 기반으로 우선순위 큐에 추가
        for (Map.Entry<Long, List<Long>> entry : postIdToProductIdsMap.entrySet()) {
            Long relatedPostId = entry.getKey();
            DeskteriorPost relatedPost = deskteriorPostRepository.findById(relatedPostId)
                    .orElseThrow(() -> new NoSuchElementException("게시물을 찾을 수 없습니다: " + relatedPostId));

            CreatePostProductMatchResponseDto dto = new CreatePostProductMatchResponseDto(
                    relatedPostId,
                    entry.getValue(),
                    relatedPost.getMember().getNickname(),
                    relatedPost.getMember().getImageUrl(),
                    relatedPost.getTitle(),
                    relatedPost.getContent(),
                    relatedPost.getThumbnailUrl(), // 썸네일 URL 추가
                    relatedPost.getViewCount(),
                    relatedPost.getLikeCount(),
                    relatedPost.getDeskteriorAttributes()
            );

            pq.add(dto);
        }

        // 우선순위 큐에서 결과를 꺼내어 리스트로 변환
        List<CreatePostProductMatchResponseDto> postProductMatches = new ArrayList<>();
        while (!pq.isEmpty()) {
            postProductMatches.add(pq.poll());
        }

        return postProductMatches;
    }


    // 키워드를 포함하는 제품 이름 목록 조회
    public List<FindProductResponseDto> searchProductNamesByKeyword(String keyword) {
        List<Product> products = productRepository.findByNameContaining(keyword);
        List<FindProductResponseDto> productNames = new ArrayList<>();

        for (Product product : products) {
            productNames.add(new FindProductResponseDto(product.getId(), product.getName()));
        }

        return productNames;
    }



    // 키워드를 포함하는 제품이 전부 포함된 게시물 조회
    public List<FindDeskteriorPostResponseDto> findPostsByProductName(String keyword) {
        List<Product> products = productRepository.findByNameContaining(keyword);

        List<Long> productIds = new ArrayList<>();
        for (Product product : products) {
            productIds.add(product.getId());
        }

        Set<Long> uniquePostIds = new HashSet<>();
        List<FindDeskteriorPostResponseDto> postResponseDtos = new ArrayList<>();

        if (!productIds.isEmpty()) {
            List<Long> postIds = deskteriorPostProductInfoRepository.findPostIdsByProductIds(productIds);

            for (Long postId : postIds) {
                if (uniquePostIds.add(postId)) {
                    Optional<DeskteriorPost> optionalPost = deskteriorPostRepository.findById(postId);

                    if (optionalPost.isPresent()) {
                        DeskteriorPost post = optionalPost.get();

                        List<DeskteriorPostProductInfo> productInfos = post.getDeskteriorPostProductInfos();
                        if (productInfos.isEmpty()) {
                            continue;
                        }

                        FindDeskteriorPostResponseDto dto = new FindDeskteriorPostResponseDto(post);
                        postResponseDtos.add(dto);
                    }
                }
            }
        }

        return postResponseDtos;
    }

    // ExistStatus 처리 로직
    private ExistStatus determineExistStatus(String path) {
        return (path != null && !path.isEmpty()) ? ExistStatus.EXIST : ExistStatus.NOT_EXIST;
    }
}