package com.a306.dekku.external.elasticsearch.service;

import com.a306.dekku.external.elasticsearch.model.dto.response.GetBoardResponse;
import com.a306.dekku.domain.board.model.entity.Board;
import com.a306.dekku.domain.board.repository.BoardRepository;
import com.a306.dekku.external.elasticsearch.model.document.BoardDocument;
import com.a306.dekku.external.elasticsearch.repository.BoardElasticsearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardElasticsearchServiceImpl implements BoardElasticsearchService {

    private final BoardRepository boardRepository;
    private final BoardElasticsearchRepository boardElasticsearchRepository;

    @Override
    public void saveAll() {
        List<Board> boards = boardRepository.findAllWithProducts();
        List<BoardDocument> documents = boards.stream()
                .map(BoardDocument::of)
                .collect(Collectors.toList());

        boardElasticsearchRepository.saveAll(documents);
    }

    @Override
    public List<GetBoardResponse> searchBoardsByNgramKeyword(String keyword) {
        List<BoardDocument> results = boardElasticsearchRepository
                .searchByNgramKeyword(keyword);

        return results.stream()
                .map(GetBoardResponse::fromDocument) // BoardDocument → 응답 DTO 변환
                .collect(Collectors.toList());

    }

    @Override
    public List<GetBoardResponse> searchBoardsByEdgeNgramKeyword(String keyword) {
        List<BoardDocument> results = boardElasticsearchRepository
                .searchByEdgeNgramKeyword(keyword);

        return results.stream()
                .map(GetBoardResponse::fromDocument) // BoardDocument → 응답 DTO 변환
                .collect(Collectors.toList());
    }
}
