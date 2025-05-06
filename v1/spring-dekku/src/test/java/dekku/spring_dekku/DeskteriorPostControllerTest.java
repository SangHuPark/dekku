package dekku.spring_dekku;

import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindByIdDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.service.DeskteriorPostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DeskteriorPostControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private DeskteriorPostService deskteriorPostService;

    private String baseUrl;

    @BeforeEach
    void setUp() {
        baseUrl = "http://localhost:" + port + "/api/deskterior-post";
    }

    @Test
    void concurrentFindDeskteriorPostTest() throws InterruptedException {
        int numberOfThreads = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);
        Long postId = 1L; // Assume this post exists

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.execute(() -> {
                try {
                    ResponseEntity<FindByIdDeskteriorPostResponseDto> response =
                            restTemplate.getForEntity(baseUrl + "/" + postId, FindByIdDeskteriorPostResponseDto.class);

                    if (response.getStatusCode() == HttpStatus.OK) {
                        successCount.incrementAndGet();
                    } else {
                        failCount.incrementAndGet();
                    }
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await(); // Wait for all threads to finish
        executorService.shutdown();

        // Verify results
        assertThat(successCount.get()).isEqualTo(numberOfThreads);
        assertThat(failCount.get()).isZero();

        // Check the final view count
        FindByIdDeskteriorPostResponseDto finalResponse = deskteriorPostService.findById(postId, true);
        assertThat(finalResponse.viewCount()).isEqualTo(numberOfThreads);
    }
}
