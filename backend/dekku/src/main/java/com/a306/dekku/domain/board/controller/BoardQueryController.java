package com.a306.dekku.domain.board.controller;

import com.a306.dekku.domain.board.model.dto.SimpleBoardDto;
import com.a306.dekku.external.elasticsearch.model.dto.response.GetBoardResponse;
import com.a306.dekku.domain.board.service.BoardQueryService;
import com.a306.dekku.external.elasticsearch.service.BoardElasticsearchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BoardQueryController {

    private final BoardQueryService boardQueryService;
    private final BoardElasticsearchService boardElasticsearchService;

    @GetMapping("/v1/boards/search")
    public ResponseEntity<List<SimpleBoardDto>> searchBoards(
            @RequestParam("keyword") String keyword
    ) {
        List<SimpleBoardDto> results = boardQueryService.searchBoardsByKeyword(keyword);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/v2/boards/search")
    public ResponseEntity<List<GetBoardResponse>> searchBoardsByNgram(
            @RequestParam("keyword") String keyword
    ) {
        log.info("ngram : {}", keyword);
        List<GetBoardResponse> results = boardElasticsearchService.searchBoardsByNgramKeyword(keyword);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/v3/boards/search")
    public ResponseEntity<List<GetBoardResponse>> searchBoardsByEdgeNgram(
            @RequestParam("keyword") String keyword
    ) {
        log.info("edge-ngram : {}", keyword);
        List<GetBoardResponse> results = boardElasticsearchService.searchBoardsByEdgeNgramKeyword(keyword);
        return ResponseEntity.ok(results);
    }

}
