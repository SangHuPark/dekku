package dekku.spring_dekku.domain.product.model.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "file_paths")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FilePath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_path_id")
    private Long id;

    private String path;

    @OneToOne(mappedBy = "filePath", fetch = FetchType.LAZY)
    private Product product;
}
