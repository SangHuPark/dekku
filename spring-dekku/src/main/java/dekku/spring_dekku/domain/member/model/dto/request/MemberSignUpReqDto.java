package dekku.spring_dekku.domain.member.model.dto.request;

public class MemberSignUpReqDto {

	private String email;
	private String password;
	private String nickName;

	public MemberSignUpReqDto() {
	}

	public MemberSignUpReqDto(String email, String password, String nickName) {
		this.email = email;
		this.password = password;
		this.nickName = nickName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getNickName() {
		return nickName;
	}

}
