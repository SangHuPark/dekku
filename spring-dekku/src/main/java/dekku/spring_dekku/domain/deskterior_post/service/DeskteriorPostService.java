package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;

import java.util.List;

public interface DeskteriorPostService {

    CreateDeskteriorPostResponseDto addDeskteriorPost(String email, CreateDeskteriorPostRequestDto requestDto);

    List<DeskteriorPost> findAll();

    DeskteriorPost findById(Long id);
}
