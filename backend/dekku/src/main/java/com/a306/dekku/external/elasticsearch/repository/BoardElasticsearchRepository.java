package com.a306.dekku.external.elasticsearch.repository;

import com.a306.dekku.external.elasticsearch.model.document.BoardDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface BoardElasticsearchRepository extends ElasticsearchRepository<BoardDocument, String> {

    @Query("""
    {
      "bool": {
        "should": [
          { "match": { "title": { "query": "?0", "operator": "or" }}},
          { "match": { "productNames": { "query": "?0", "operator": "or" }}}
        ]
      }
    }
    """)
    List<BoardDocument> searchByNgramKeyword(String keyword);

    @Query("""
    {
      "bool": {
        "should": [
          {
            "match": {
              "title": {
                "query": "?0",
                "analyzer": "jaso_edge_ngram_search_analyzer"
              }
            }
          },
          {
            "match": {
              "productNames": {
                "query": "?0",
                "analyzer": "jaso_edge_ngram_search_analyzer"
              }
            }
          }
        ]
      }
    }
    """)
    List<BoardDocument> searchByEdgeNgramKeyword(String keyword);


}
