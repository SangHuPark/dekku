package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;

public interface DeskteriorPostService {

    CreateDeskteriorPostResponseDto addDeskteriorPost(String email, CreateDeskteriorPostRequestDto requestDto);
}
