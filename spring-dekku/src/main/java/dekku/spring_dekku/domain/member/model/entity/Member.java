package dekku.spring_dekku.domain.member.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String nickname;

	private String phone;

	private String image_url;

	private Timestamp created_at;

	private Timestamp deleted_at;

	@ManyToOne
	@JoinColumn(name = "role_id")
	private MemberRole role;
}

