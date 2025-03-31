package com.a306.dekku.external.elasticsearch.service;

import com.a306.dekku.external.elasticsearch.model.dto.response.GetBoardResponse;

import java.util.List;

public interface BoardElasticsearchService {

    void saveAll();

    List<GetBoardResponse> searchBoardsByNgramKeyword(String keyword);

    List<GetBoardResponse> searchBoardsByEdgeNgramKeyword(String keyword);

}
