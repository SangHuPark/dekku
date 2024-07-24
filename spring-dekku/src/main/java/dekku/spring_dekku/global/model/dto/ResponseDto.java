package dekku.spring_dekku.global.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
public class ResponseDto<T> {

    private String timestamp;
    private String trackingId;
    private T result;

    public ResponseDto() {
        this.timestamp = LocalDateTime.now().toString();
        this.trackingId = UUID.randomUUID().toString();
    }

    public ResponseDto(String timestamp, String trackingId, T result) {
        this.timestamp = timestamp;
        this.trackingId = trackingId;
        this.result = result;
    }
}
