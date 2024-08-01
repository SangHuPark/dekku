package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeskteriorPostServiceImpl implements DeskteriorPostService {

    private final MemberRepository memberRepository;

    private final DeskteriorPostRepository deskteriorPostRepository;

    @Override
    public CreateDeskteriorPostResponseDto addDeskteriorPost(String email, CreateDeskteriorPostRequestDto requestDto) {

        Member member = memberRepository.findByEmail(email);

        DeskteriorPost deskteriorPost = CreateDeskteriorPostRequestDto.toEntity();
        deskteriorPostRepository.save(new DeskteriorPost(member, ));

        /**
         *        Menu menu = CreateMenuInDto.toEntity(restaurant, name, price, description, imageUrl);
         *         menuRepository.save(menu);
         *
         *         return CreateMenuOutDto.of(menu.getId(), menu.getDetails().getName());
         */

        return null;
    }
}
