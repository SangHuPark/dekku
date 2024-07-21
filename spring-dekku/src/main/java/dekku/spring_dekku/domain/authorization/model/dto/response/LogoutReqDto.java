package dekku.spring_dekku.domain.authorization.model.dto.response;

public class LogoutReqDto {

	private Long id;
	private String email;

	public LogoutReqDto() {
	}

	public LogoutReqDto(Long id, String email) {
		this.id = id;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

}
