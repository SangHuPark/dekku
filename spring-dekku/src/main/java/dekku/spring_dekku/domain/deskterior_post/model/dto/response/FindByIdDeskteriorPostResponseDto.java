package dekku.spring_dekku.domain.deskterior_post.model.dto.response;

import dekku.spring_dekku.domain.comment.model.dto.response.CommentResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPostImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.attribute.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.code.OpenStatus;
import dekku.spring_dekku.domain.like.model.entity.Like;
import dekku.spring_dekku.domain.product.model.dto.response.CreateProductResponseDto;
import dekku.spring_dekku.domain.product.model.entity.DeskteriorPostProductInfo;
import dekku.spring_dekku.domain.product.model.entity.Product;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public record FindByIdDeskteriorPostResponseDto(
        Long memberId,
        String memberNickName,
        String memberImage,
        String title,
        String content,
        List<String> deskteriorPostImages,
        List<String> likes,
        List<CreateProductResponseDto> deskteriorPostProductInfos,
        List<CommentResponseDto> comments,
        int viewCount,
        int likeCount,
        int commentCount,
        OpenStatus openStatus,
        DeskteriorAttributes deskteriorAttributes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String thumbnail
) {
    public FindByIdDeskteriorPostResponseDto(DeskteriorPost deskteriorPost, List<CommentResponseDto> comments) {
        this(
                deskteriorPost.getMember().getId(),
                deskteriorPost.getMember().getNickname(),
                deskteriorPost.getMember().getImageUrl(),
                deskteriorPost.getTitle(),
                deskteriorPost.getContent(),
                mapDeskteriorPostImages(deskteriorPost.getDeskteriorPostImages()),
                mapLikes(deskteriorPost.getLikes()),
                mapDeskteriorPostProductInfos(deskteriorPost.getDeskteriorPostProductInfos()),
                comments,
                deskteriorPost.getViewCount(),
                deskteriorPost.getLikes().size(),
                deskteriorPost.getCommentCount(),
                deskteriorPost.getOpenStatus(),
                deskteriorPost.getDeskteriorAttributes(),
                deskteriorPost.getCreatedAt(),
                deskteriorPost.getUpdatedAt(),
                deskteriorPost.getThumbnailUrl()
        );
    }

    private static List<String> mapDeskteriorPostImages(List<DeskteriorPostImage> deskteriorPostImages) {
        List<String> images = new ArrayList<>();
        for (DeskteriorPostImage image : deskteriorPostImages) {
            images.add(image.getImageUrl());
        }
        return images;
    }

    private static List<String> mapLikes(List<Like> likes) {
        List<String> likeList = new ArrayList<>();
        for (Like like : likes) {
            likeList.add(like.getMember().getNickname());
        }
        return likeList;
    }

    private static List<CreateProductResponseDto> mapDeskteriorPostProductInfos(List<DeskteriorPostProductInfo> deskteriorPostProductInfos) {
        List<CreateProductResponseDto> productInfos = new ArrayList<>();
        for (DeskteriorPostProductInfo productInfo : deskteriorPostProductInfos) {
            Product product = productInfo.getProduct();

            CreateProductResponseDto productDto = new CreateProductResponseDto(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getScale(),
                    product.getDescription(),
                    product.getExistStatus(),
                    product.getCategory(),
                    product.getFilePath().getPath()
            );
            productInfos.add(productDto);
        }
        return productInfos;
    }
}