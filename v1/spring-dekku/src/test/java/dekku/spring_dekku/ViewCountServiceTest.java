package dekku.spring_dekku;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostServiceImpl;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

@SpringBootTest
class ViewCountServiceTest {

    @Autowired
    DeskteriorPostServiceImpl deskteriorPostService;

    @Autowired
    DeskteriorPostRepository deskteriorPostRepository;

    private Long POST_ID = null;
    private final Integer CONCURRENT_COUNT = 100;

    @BeforeEach
    public void before() {
        DeskteriorPost post = DeskteriorPost.builder()
                .viewCount(0).build();
        DeskteriorPost saved = deskteriorPostRepository.saveAndFlush(post);
        POST_ID = saved.getId();
    }

    @AfterEach
    public void after() {
        deskteriorPostRepository.deleteAll();
    }

    private void viewTest(Consumer<Void> action) throws InterruptedException {
        int originQuantity = deskteriorPostRepository.findById(POST_ID).orElseThrow().getViewCount();

        ExecutorService executorService = Executors.newFixedThreadPool(32);
        CountDownLatch latch = new CountDownLatch(CONCURRENT_COUNT);

        for (int i = 0; i < CONCURRENT_COUNT; i++) {
            executorService.submit(() -> {
                try {
                    action.accept(null);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        DeskteriorPost post = deskteriorPostRepository.findById(POST_ID).orElseThrow();
        Assertions.assertEquals(CONCURRENT_COUNT + originQuantity, post.getViewCount());
    }

    @Test
    @DisplayName("동시에 1000명의 조회 : 동시성 이슈")
    public void badConcurrencyTest() throws Exception {
        viewTest((_no) -> deskteriorPostService.lookup(POST_ID, 1));
    }

    @Test
    @DisplayName("동시에 1000명의 조회 : 분산락")
    public void redissonConcurrencyTest() throws Exception {
        viewTest((_no) -> deskteriorPostService.redissonLookup(POST_ID, 1));
    }

    @Test
    @DisplayName("실제 포스트 조회 시 분산 락 적용 여부 테스트")
    public void viewCountTest() throws Exception {
        viewTest((_no) -> deskteriorPostService.findById(POST_ID, true));
    }

}
