package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.request.FindPostsByJobRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindByIdDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.UpdateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;

import java.util.List;

public interface DeskteriorPostService {

    CreateDeskteriorPostResponseDto addDeskteriorPost(String token, CreateDeskteriorPostRequestDto requestDto);

    List<FindDeskteriorPostResponseDto> findAll();

    List<FindDeskteriorPostResponseDto> findJobPosts(FindPostsByJobRequestDto request);

    FindByIdDeskteriorPostResponseDto findById(Long id, Boolean isRender);

    DeskteriorPost updateDeskteriorPost(Long id, String token, UpdateDeskteriorPostRequestDto requestDto);

    void deleteDeskteriorPost(Long id, String token);

    List<FindDeskteriorPostResponseDto> findTopThreePosts();

    boolean isPostLikedByUser(String token, Long postId);
}
