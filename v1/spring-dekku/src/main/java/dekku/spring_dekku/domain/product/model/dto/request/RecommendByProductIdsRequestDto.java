package dekku.spring_dekku.domain.product.model.dto.request;

import java.util.List;

public record RecommendByProductIdsRequestDto(
        List<Long> productIds
){}
