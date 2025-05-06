package dekku.spring_dekku.domain.product.model.dto.response;

import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;

public record CreateProductResponseDto (
        Long id, // 제품 아이디
        String name, // 제품명
        String price, // 제품 가격
        String imageUrl, // 이미지 url
        String salesLink, // 파트너스 링크
        String description, // 제품 설명
        ExistStatus existStatus, // 모델 존재 여부
        Category category, // 제품 카테고리
        String filePath // 내부 3D 파일 경로
) {}