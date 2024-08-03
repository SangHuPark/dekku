package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostImageRepository;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.product.exception.NotExistsProductException;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.repository.ProductRepository;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeskteriorPostServiceImpl implements DeskteriorPostService {

    private final MemberRepository memberRepository;

    private final DeskteriorPostRepository deskteriorPostRepository;

    private final DeskteriorPostImageRepository deskteriorPostImageRepository;

    private final ProductRepository productRepository;

    private final ModelMapper modelMapper;

    @Override
    public CreateDeskteriorPostResponseDto addDeskteriorPost(String username, CreateDeskteriorPostRequestDto request) {

        Member member = memberRepository.findByUsername(username);

        // Embeddable 생성
        DeskteriorAttributes deskteriorAttributes = CreateDeskteriorPostRequestDto.createDeskteriorAttributes(
                request.style(),
                request.color(),
                request.job()
        );

        DeskteriorPost newDeskteriorPost = CreateDeskteriorPostRequestDto.toEntity(
                member,
                request.title(),
                request.content(),
                deskteriorAttributes,
                request.openStatus()
        );

        // imageUrl 로 deskteriorPost 내 List<DeskteriorPostImage> 생성
        for (String imageUrl : request.deskteriorPostImages()) {

            DeskteriorPostImage deskteriorPostImage = DeskteriorPostImage.builder()
                    .deskteriorPost(newDeskteriorPost)
                    .imageUrl(imageUrl)
                    .build();

            newDeskteriorPost.insertDeskteriorPostImages(deskteriorPostImage);

        }

        // productId 로 deskteriorPost 내 List<Product> 생성
        for (Long productId : request.productIds()) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new NotExistsProductException(ErrorCode.NOT_EXISTS_PRODUCT));

            DeskteriorPostProductInfo deskteriorPostProductInfo = DeskteriorPostProductInfo.builder()
                    .deskteriorPost(newDeskteriorPost)
                    .product(product)
                    .build();

            newDeskteriorPost.insertDeskteriorPostProductInfos(deskteriorPostProductInfo);
        }

        DeskteriorPost deskteriorPost = deskteriorPostRepository.save(newDeskteriorPost);

//        CreateDeskteriorPostResponseDto response = modelMapper.map(deskteriorPost, CreateDeskteriorPostResponseDto.class);

        CreateDeskteriorPostResponseDto response = new CreateDeskteriorPostResponseDto(deskteriorPost.getTitle(), deskteriorPost.getContent());

        return response;
    }

    @Override
    public List<DeskteriorPost> findAll() {
        List<DeskteriorPost> deskteriorPosts = deskteriorPostRepository.findAll();

        List<FindDeskteriorPostResponseDto> response = new ArrayList<>();

        for (DeskteriorPost deskteriorPost : deskteriorPosts) {
            FindDeskteriorPostResponseDto findDeskteriorPostResponseDto = new FindDeskteriorPostResponseDto();
//            FindDeskteriorPostResponseDto findDeskteriorPostResponseDto = new FindDeskteriorPostResponseDto(deskteriorPost.getId(), deskteriorPost.getMember().getId());
            response.add(findDeskteriorPostResponseDto);
        }

        return deskteriorPosts;
    }
}
