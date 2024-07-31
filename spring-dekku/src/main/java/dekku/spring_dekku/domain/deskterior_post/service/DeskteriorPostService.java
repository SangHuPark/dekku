package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.dto.DeskteriorPostDto;
import dekku.spring_dekku.domain.deskterior_post.dto.DeskteriorImageDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorImageRepository;
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
                .userId(postDto.getUserId())
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

        DeskteriorPost updatedPost = existingPost.toBuilder()
                .title(updatedPostDto.getTitle() != null ? updatedPostDto.getTitle() : existingPost.getTitle())
                .thumbnailUrl(updatedPostDto.getThumbnailUrl() != null ? updatedPostDto.getThumbnailUrl() : existingPost.getThumbnailUrl())
                .content(updatedPostDto.getContent() != null ? updatedPostDto.getContent() : existingPost.getContent())
                .modifiedAt(new Timestamp(System.currentTimeMillis()))
                .deskteriorImage(updatedImage != null ? updatedImage : existingPost.getDeskteriorImage())
                .build();

        DeskteriorPost savedPost = deskteriorPostRepository.save(updatedPost);
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
                .build();
    }

    private DeskteriorImage convertToEntity(DeskteriorImageDto imageDto) {
        return DeskteriorImage.builder()
                .imageUrl(imageDto.getImageUrl())
                .build();
    }
}
