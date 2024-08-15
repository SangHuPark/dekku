package dekku.spring_dekku.domain.product.model.dto.request;

import dekku.spring_dekku.domain.product.model.entity.code.Category;
import dekku.spring_dekku.domain.product.model.entity.code.ExistStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CreateProductRequestDto (
        @NotBlank(message = "제품명은 공백일 수 없습니다.") // 제품명
        String name,

        @Pattern(regexp = "^[0-9]+$", message = "제품 가격은 숫자만 입력할 수 있습니다.")
        String price,

        @NotBlank(message = "이미지 URL은 공백일 수 없습니다.") // 이미지 url
        String imageUrl,

        @NotNull(message = "모델의 크기는 NULL일 수 없습니다.") // 파트너스 링크
        String scale,

        @NotNull(message = "제품 설명은 NULL일 수 없습니다.") // 제품 설명
        String description,

//        @NotNull(message = "모델 존재 여부를 선택해주세요.") // 모델 존재 여부
//        ExistStatus existStatus,

        @NotNull(message = "제품 카테고리를 선택해주세요.") // 제품 카테고리
        Category category,

        @NotNull(message = "내부 3D 파일 경로는 NULL일 수 없습니다.") // 내부 3D 파일 경로
        String filePath
) {
        public CreateProductRequestDto {
                if (price == null || price.trim().isEmpty()) {
                        price = "0";
                }
        }
}