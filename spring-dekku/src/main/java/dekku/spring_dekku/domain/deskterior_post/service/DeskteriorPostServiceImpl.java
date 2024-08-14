package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.comment.event.CommentCreatedEvent;
import dekku.spring_dekku.domain.comment.event.CommentDeletedEvent;
import dekku.spring_dekku.domain.comment.model.dto.response.CommentResponseDto;
import dekku.spring_dekku.domain.comment.model.entity.Comment;
import dekku.spring_dekku.domain.comment.service.CommentService;
import dekku.spring_dekku.domain.deskterior_post.exception.NotExistsDeskteriorPostException;
import dekku.spring_dekku.domain.deskterior_post.model.dto.request.CreateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.CreateDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindByIdDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.response.UpdateDeskteriorPostRequestDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.like.model.entity.Like;
import dekku.spring_dekku.domain.member.exception.NotExistsUserException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.product.exception.NotExistsProductException;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.domain.product.model.entity.Product;
import dekku.spring_dekku.domain.product.repository.ProductRepository;
import dekku.spring_dekku.global.aop.DistributeLock;
import dekku.spring_dekku.global.exception.AccessTokenException;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DeskteriorPostServiceImpl implements DeskteriorPostService {

    private final MemberRepository memberRepository;

    private final DeskteriorPostRepository deskteriorPostRepository;

//    private final DeskteriorPostImageRepository deskteriorPostImageRepository;

    private final ProductRepository productRepository;

//    private final ModelMapper modelMapper;

    private final CommentService commentService;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public CreateDeskteriorPostResponseDto addDeskteriorPost(String token, CreateDeskteriorPostRequestDto request) {
        if (token == null || token.isEmpty()) {
            throw new AccessTokenException(ErrorCode.INVALID_TOKEN);
        }

        String username = jwtTokenProvider.getUsername(token);
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

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
        CreateDeskteriorPostResponseDto response = new CreateDeskteriorPostResponseDto(savedDeskteriorPost.getTitle(), savedDeskteriorPost.getContent(),
                                                        savedDeskteriorPost.getId());

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FindDeskteriorPostResponseDto> findAll() {
        List<DeskteriorPost> deskteriorPosts = deskteriorPostRepository.findAll();
        if (deskteriorPosts.isEmpty()) {
            throw new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST);
        }

        List<FindDeskteriorPostResponseDto> response = new ArrayList<>();

        for (DeskteriorPost deskteriorPost : deskteriorPosts) {

            if (Objects.isNull(deskteriorPost.getThumbnailUrl()) && !deskteriorPost.getDeskteriorPostImages().isEmpty()) {
                deskteriorPost.insertThumbnailUrl(deskteriorPost.getDeskteriorPostImages().get(0).getImageUrl());
            }

            FindDeskteriorPostResponseDto findDeskteriorPostResponseDto = new FindDeskteriorPostResponseDto(deskteriorPost);

            response.add(findDeskteriorPostResponseDto);
        }

        return response;
    }

    @Override
    @Transactional
    public List<FindDeskteriorPostResponseDto> findTopThreePosts() {
        List<DeskteriorPost> deskteriorPosts = deskteriorPostRepository.findTopPosts();
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


    @DistributeLock(key = "#id")
    public FindByIdDeskteriorPostResponseDto findById(Long id) {
        DeskteriorPost foundDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        foundDeskteriorPost.increase(1);
        deskteriorPostRepository.saveAndFlush(foundDeskteriorPost);

        List<CommentResponseDto> commentResponseDtos = commentService.getCommentsByPostId(id);

        return new FindByIdDeskteriorPostResponseDto(foundDeskteriorPost, commentResponseDtos);
    }

    @DistributeLock(key = "#postId")
    public void redissonLookup(Long postId, int quantity) {
        DeskteriorPost post = deskteriorPostRepository.findById(postId).orElseThrow();
        post.increase(quantity);
        deskteriorPostRepository.saveAndFlush(post);
    }

    public void lookup(Long postId, int quantity) {
        DeskteriorPost post = deskteriorPostRepository.findById(postId).orElseThrow();
        post.increase(quantity);
        deskteriorPostRepository.saveAndFlush(post);
    }


    @Override
    @Transactional
    public DeskteriorPost updateDeskteriorPost(Long id, String token, UpdateDeskteriorPostRequestDto request) {
        String username = extractUsernameFromToken(token);
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        DeskteriorPost existingDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        if (!existingDeskteriorPost.getMember().getId().equals(member.getId())) {
            throw new AccessTokenException(ErrorCode.INVALID_TOKEN);
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
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        DeskteriorPost existingDeskteriorPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        if (!existingDeskteriorPost.getMember().getId().equals(member.getId())) {
            throw new AccessTokenException(ErrorCode.INVALID_TOKEN);
        }

        deskteriorPostRepository.delete(existingDeskteriorPost);
    }

    @Transactional(readOnly = true)
    public boolean isPostLikedByUser(String token, Long postId) {
        String username = jwtTokenProvider.getUsername(token);
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        DeskteriorPost post = deskteriorPostRepository.findById(postId)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        for (Like like : post.getLikes()) {
            if (like.getMember().equals(member)) {
                return true;
            }
        }

        return false;
    }


    @EventListener
    @Transactional
    public void handleCommentCreatedEvent(CommentCreatedEvent event) {
        DeskteriorPost post = deskteriorPostRepository.findById(event.getPostId())
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        post.increaseCommentCount();
        deskteriorPostRepository.save(post);
    }

    @EventListener
    @Transactional
    public void handleCommentDeletedEvent(CommentDeletedEvent event) {
        DeskteriorPost post = deskteriorPostRepository.findById(event.getPostId())
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        post.decreaseCommentCount();
        deskteriorPostRepository.save(post);
    }

    private String extractUsernameFromToken(String token) {
        return jwtTokenProvider.getUsername(token);
    }
}