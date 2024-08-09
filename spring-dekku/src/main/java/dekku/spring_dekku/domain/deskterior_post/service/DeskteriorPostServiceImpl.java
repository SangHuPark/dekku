package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.comment.model.dto.response.CommentResponseDto;
import dekku.spring_dekku.domain.comment.service.CommentService;
import dekku.spring_dekku.domain.deskterior_post.exception.NotExistsDeskteriorPostException;
import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindByIdDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.UpdateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Color;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Job;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.Style;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostImageRepository;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.product.exception.NotExistsProductException;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.repository.ProductRepository;
import dekku.spring_dekku.global.exception.AccessTokenException;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final CommentService commentService;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public CreateDeskteriorPostResponseDto addDeskteriorPost(String token, CreateDeskteriorPostRequestDto request) {
        if (token == null || token.isEmpty()) {
            throw new AccessTokenException("액세스 토큰이 없습니다.");
        }
        String username = jwtTokenProvider.getUsername(token);
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }

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

        DeskteriorPost savedDeskteriorPost = deskteriorPostRepository.save(newDeskteriorPost);

//        CreateDeskteriorPostResponseDto response = modelMapper.map(deskteriorPost, CreateDeskteriorPostResponseDto.class);
        CreateDeskteriorPostResponseDto response = new CreateDeskteriorPostResponseDto(savedDeskteriorPost.getTitle(), savedDeskteriorPost.getContent());

        return response;
    }

    @Override
    @Transactional
    public List<FindDeskteriorPostResponseDto> findAll() {
        List<DeskteriorPost> deskteriorPosts = deskteriorPostRepository.findAll();
        if (deskteriorPosts.isEmpty()) {
            throw new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST);
        }

        List<FindDeskteriorPostResponseDto> response = new ArrayList<>();

        for (DeskteriorPost deskteriorPost : deskteriorPosts) {
            FindDeskteriorPostResponseDto findDeskteriorPostResponseDto = new FindDeskteriorPostResponseDto(deskteriorPost);
            response.add(findDeskteriorPostResponseDto);
        }

        return response;
    }


    public FindByIdDeskteriorPostResponseDto findById(Long id) {
        DeskteriorPost foundDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        List<CommentResponseDto> commentResponseDtos = commentService.getCommentsByPostId(id);

        return new FindByIdDeskteriorPostResponseDto(foundDeskteriorPost, commentResponseDtos);
    }


    @Override
    @Transactional
    public DeskteriorPost updateDeskteriorPost(Long id, String token, UpdateDeskteriorPostRequestDto request) {
        String username = extractUsernameFromToken(token);
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        DeskteriorPost existingDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        if (!existingDeskteriorPost.getMember().getId().equals(member.getId())) {
            throw new AccessTokenException("게시글을 수정할 권한이 없습니다.");
        }

        if (request.title() != null) {
            existingDeskteriorPost.title = request.title();
        }
        if (request.content() != null) {
            existingDeskteriorPost.content = request.content();
        }

        DeskteriorAttributes existingAttributes = existingDeskteriorPost.getDeskteriorAttributes();
        if (request.style() != null) {
            existingAttributes.style = request.style();
        }
        if (request.color() != null) {
            existingAttributes.color = request.color();
        }
        if (request.job() != null) {
            existingAttributes.job = request.job();
        }
        if (request.openStatus() != null) {
            existingDeskteriorPost.openStatus = request.openStatus();
        }

        if (request.deskteriorPostImages() != null && !request.deskteriorPostImages().isEmpty()) {
            existingDeskteriorPost.getDeskteriorPostImages().clear();
            for (String imageUrl : request.deskteriorPostImages()) {
                DeskteriorPostImage deskteriorPostImage = DeskteriorPostImage.builder()
                        .deskteriorPost(existingDeskteriorPost)
                        .imageUrl(imageUrl)
                        .build();
                existingDeskteriorPost.insertDeskteriorPostImages(deskteriorPostImage);
            }
        }

        if (request.productIds() != null && !request.productIds().isEmpty()) {
            existingDeskteriorPost.getDeskteriorPostProductInfos().clear();
            for (Long productId : request.productIds()) {
                Product product = productRepository.findById(productId)
                        .orElseThrow(() -> new NotExistsProductException(ErrorCode.NOT_EXISTS_PRODUCT));
                DeskteriorPostProductInfo deskteriorPostProductInfo = DeskteriorPostProductInfo.builder()
                        .deskteriorPost(existingDeskteriorPost)
                        .product(product)
                        .build();
                existingDeskteriorPost.insertDeskteriorPostProductInfos(deskteriorPostProductInfo);
            }
        }

        return deskteriorPostRepository.save(existingDeskteriorPost);
    }

    @Override
    public void deleteDeskteriorPost(Long id, String token) {
        String username = extractUsernameFromToken(token);
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        DeskteriorPost existingDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        if (!existingDeskteriorPost.getMember().getId().equals(member.getId())) {
            throw new AccessTokenException("게시글을 삭제할 권한이 없습니다.");
        }

        deskteriorPostRepository.delete(existingDeskteriorPost);
    }

    private String extractUsernameFromToken(String token) {
        return jwtTokenProvider.getUsername(token);
    }
}