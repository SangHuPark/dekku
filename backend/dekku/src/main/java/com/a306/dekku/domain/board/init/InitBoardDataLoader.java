package com.a306.dekku.domain.board.init;

import com.a306.dekku.domain.board.model.entity.Board;
import com.a306.dekku.domain.board.model.entity.BoardProduct;
import com.a306.dekku.domain.board.repository.BoardRepository;
import com.a306.dekku.domain.product.model.entity.Product;
import com.a306.dekku.domain.product.repository.ProductRepository;
import com.a306.dekku.external.elasticsearch.service.BoardElasticsearchService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class InitBoardDataLoader {

    private final BoardRepository boardRepository;
    private final ProductRepository productRepository;
    private final BoardElasticsearchService boardElasticsearchService;

    private final List<String> productNames = Arrays.asList(
            "LG 27UP850", "LG 울트라기어 32GP850", "로지텍 MX Keys", "엘라고 거치대",
            "앤커 무선충전기", "마샬 스피커", "LG 스탠바이미", "에르고휴먼 의자",
            "LG 울트라파인 5K", "루나랩 모니터암", "LG 그램 +뷰", "로지텍 MX Master 3S",
            "데스커 책상", "마이크론 키보드", "아이리버 스피커", "샤오미 LED 스탠드",
            "넷기어 공유기", "브리츠 사운드바", "필립스 모니터", "삼성 스마트 모니터",
            "카멜마운트 모니터암", "벤큐 GW2785", "커세어 K70 키보드", "로지텍 C920 웹캠",
            "바나나몽 키캡", "미지아 데스크램프", "델 인스피론 모니터", "델 모니터암"
    );

    private final Random random = new Random();

    @PostConstruct
    public void initBoardData() {
        // 테스트용 Product 미리 생성
        productNames.forEach(name -> {
            if (productRepository.findByName(name).isEmpty()) {
                productRepository.save(Product.builder()
                        .name(name)
                        .price("199,000")
                        .description(name + " 제품 설명")
                        .thumbnailImageUrl("https://example.com/thumb.jpg")
                        .build());
            }
        });

        List<Product> allProducts = productRepository.findAll();

        for (int boardIdx = 0; boardIdx < 120; boardIdx++) { // 30 → 120개 게시글로 확장
            String title = productNames.get(random.nextInt(productNames.size())) + " 사용 후기";
            String content = "이 제품 정말 만족스러워요! 데스크테리어에 딱 맞아요.";

            Board board = Board.builder()
                    .title(title)
                    .content(content)
                    .build();

            int count = random.nextInt(3) + 1;
            for (int productIdx = 0; productIdx < count; productIdx++) {
                Product product = allProducts.get(random.nextInt(allProducts.size()));
                board.addBoardProduct(BoardProduct.of(board, product));
            }

            boardRepository.save(board);
        }

        log.info("테스트 게시글 데이터 초기화 완료");
    }
}
