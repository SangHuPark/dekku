package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.DeskteriorPostDto;
import dekku.spring_dekku.domain.deskterior_post.model.dto.DeskteriorImageDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import dekku.spring_dekku.domain.deskterior_post.model.type.Color;
import dekku.spring_dekku.domain.deskterior_post.model.type.Job;
import dekku.spring_dekku.domain.deskterior_post.model.type.Style;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorImageRepository;
import dekku.spring_dekku.domain.deskterior_post.model.type.Status;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorAttributes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeskteriorPostService {

    private final DeskteriorPostRepository deskteriorPostRepository;
    private final DeskteriorImageRepository deskteriorImageRepository;

    @Autowired
    public DeskteriorPostService(DeskteriorPostRepository deskteriorPostRepository, DeskteriorImageRepository deskteriorImageRepository) {
        this.deskteriorPostRepository = deskteriorPostRepository;
        this.deskteriorImageRepository = deskteriorImageRepository;
    }

    // 1. 모든 게시물 조회
    public List<DeskteriorPostDto> findAll() {
        return deskteriorPostRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 2. ID로 게시물 조회
    public DeskteriorPostDto findById(Long id) {
        DeskteriorPost post = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        return convertToDto(post);
    }

    // 3. 게시물 생성
    public DeskteriorPostDto save(DeskteriorPostDto postDto, DeskteriorImageDto imageDto) {
        DeskteriorImage deskteriorImage = DeskteriorImage.builder()
                .imageUrl(imageDto.getImageUrl())
                .build();

        DeskteriorImage savedImage = deskteriorImageRepository.save(deskteriorImage);

        DeskteriorPost deskteriorPost = DeskteriorPost.builder()
                .title(postDto.getTitle())
                .thumbnailUrl(postDto.getThumbnailUrl())
                .content(postDto.getContent())
                .createdAt(postDto.getCreatedAt())
                .modifiedAt(postDto.getModifiedAt())
                .deskteriorImage(savedImage)
                .deskteriorAttributes(postDto.getDeskteriorAttributes() != null ? postDto.getDeskteriorAttributes() : new DeskteriorAttributes())
                .userId(postDto.getUserId())
                .viewCount(postDto.getViewCount())
                .likeCount(postDto.getLikeCount())
                .status(postDto.getStatus() != null ? postDto.getStatus() : Status.CLOSED) // 설정하지 않을 경우
                .build();

        DeskteriorPost savedPost = deskteriorPostRepository.save(deskteriorPost);
        return convertToDto(savedPost);
    }

    // 4. 게시물 수정
    public DeskteriorPostDto update(Long id, DeskteriorPostDto updatedPostDto, DeskteriorImageDto updatedImageDto) {
        DeskteriorPost existingPost = deskteriorPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        DeskteriorImage updatedImage = existingPost.getDeskteriorImage();
        if (updatedImage != null) {
            updatedImage = updatedImage.updateImage(updatedImageDto.getImageUrl());
            deskteriorImageRepository.save(updatedImage);
        } else {
            updatedImage = DeskteriorImage.builder()
                    .imageUrl(updatedImageDto.getImageUrl())
                    .build();
            deskteriorImageRepository.save(updatedImage);
        }

        existingPost.updatePost(
                updatedPostDto.getTitle() != null ? updatedPostDto.getTitle() : existingPost.getTitle(),
                updatedPostDto.getThumbnailUrl() != null ? updatedPostDto.getThumbnailUrl() : existingPost.getThumbnailUrl(),
                updatedPostDto.getContent() != null ? updatedPostDto.getContent() : existingPost.getContent(),
                new Timestamp(System.currentTimeMillis()),
                updatedImage,
                updatedPostDto.getDeskteriorAttributes() != null ? updatedPostDto.getDeskteriorAttributes() : existingPost.getDeskteriorAttributes(),
                updatedPostDto.getViewCount() != 0 ? updatedPostDto.getViewCount() : existingPost.getViewCount(),
                updatedPostDto.getLikeCount() != 0 ? updatedPostDto.getLikeCount() : existingPost.getLikeCount(),
                updatedPostDto.getStatus() != null ? updatedPostDto.getStatus() : existingPost.getStatus()
        );

        DeskteriorPost savedPost = deskteriorPostRepository.save(existingPost);
        return convertToDto(savedPost);
    }

    // 5. ID로 게시물 삭제
    public void deleteById(Long id) {
        if (!deskteriorPostRepository.existsById(id)) {
            throw new IllegalArgumentException("Post not found with id: " + id);
        }
        DeskteriorPost postToDelete = deskteriorPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        deskteriorPostRepository.deleteById(id);
        if (postToDelete.getDeskteriorImage() != null) {
            deskteriorImageRepository.deleteById(postToDelete.getDeskteriorImage().getId());
        }
    }

    // 6. 제목에 특정 키워드를 포함하는 게시물 조회
    public List<DeskteriorPostDto> findByTitleContaining(String keyword) {
        return deskteriorPostRepository.findByTitleContaining(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 필터 적용하여 게시물 조회
    public List<DeskteriorPostDto> findPostsByFilters(Style style, Color color, Job job) {
        return deskteriorPostRepository.findPostsByFilters(style, color, job).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 엔티티를 DTO로 변환
    private DeskteriorPostDto convertToDto(DeskteriorPost post) {
        return DeskteriorPostDto.builder()
                .title(post.getTitle())
                .thumbnailUrl(post.getThumbnailUrl())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .modifiedAt(post.getModifiedAt())
                .deskteriorImageId(post.getDeskteriorImage() != null ? post.getDeskteriorImage().getId() : null)
                .userId(post.getUserId())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .status(post.getStatus())
                .deskteriorAttributes(post.getDeskteriorAttributes())
                .build();
    }

    private DeskteriorImageDto convertToDto(DeskteriorImage image) {
        return DeskteriorImageDto.builder()
                .imageUrl(image.getImageUrl())
                .build();
    }

    // DTO를 엔티티로 변환
    private DeskteriorPost convertToEntity(DeskteriorPostDto postDto) {
        return DeskteriorPost.builder()
                .title(postDto.getTitle())
                .thumbnailUrl(postDto.getThumbnailUrl())
                .content(postDto.getContent())
                .createdAt(postDto.getCreatedAt())
                .modifiedAt(postDto.getModifiedAt())
                .userId(postDto.getUserId())
                .deskteriorAttributes(postDto.getDeskteriorAttributes())
                .viewCount(postDto.getViewCount())
                .likeCount(postDto.getLikeCount())
                .status(postDto.getStatus())
                .build();
    }

    private DeskteriorImage convertToEntity(DeskteriorImageDto imageDto) {
        return DeskteriorImage.builder()
                .imageUrl(imageDto.getImageUrl())
                .build();
    }
}
