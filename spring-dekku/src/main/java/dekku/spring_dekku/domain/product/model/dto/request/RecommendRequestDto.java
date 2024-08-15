package dekku.spring_dekku.domain.product.model.dto.request;

import java.util.List;

public record RecommendRequestDto (
        List<Long> productIds
){}
