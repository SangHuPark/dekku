package dekku.spring_dekku.global.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@JsonInclude(Include.NON_EMPTY)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Success<T> {

    private String timestamp;
    private T data;

    @Builder
    public Success(T data) {
        timestamp = LocalDateTime.now().toString();
        this.data = data;
    }

}
