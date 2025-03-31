package com.a306.dekku.external.elasticsearch.init;

import com.a306.dekku.external.elasticsearch.model.document.BoardDocument;
import com.a306.dekku.external.elasticsearch.service.BoardElasticsearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ElasticsearchInitRunner implements CommandLineRunner {

    private final ElasticsearchOperations elasticsearchOperations;
    private final BoardElasticsearchService boardElasticsearchService;

    @Override
    public void run(String... args) throws Exception {
        String indexName = "board-edge-ngram";

        // 인덱스 존재하면 삭제
        if (elasticsearchOperations.indexOps(BoardDocument.class).exists()) {
            elasticsearchOperations.indexOps(BoardDocument.class).delete();
            log.info("기존 인덱스 삭제: {}", indexName);
        }

        // 인덱스 재생성
        elasticsearchOperations.indexOps(BoardDocument.class).create();
        elasticsearchOperations.indexOps(BoardDocument.class).putMapping();
        log.info("인덱스 재생성 완료: {}", indexName);

        // 데이터 재적재
        boardElasticsearchService.saveAll();
        log.info("Elasticsearch 데이터 저장 완료");
    }
}
