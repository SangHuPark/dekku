package dekku.spring_dekku.global.common.model.dto;

import java.time.LocalDateTime;
import java.util.UUID;

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

	public String getTimestamp() {
		return timestamp;
	}

	public String getTrackingId() {
		return trackingId;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

}
