package dekku.spring_dekku.domain.product.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "file_paths")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class FilePath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_path_id")
    private Long id;

    private String path;

    @OneToOne(mappedBy = "filePath", fetch = FetchType.LAZY)
    @JsonBackReference
    private Product product;

    public FilePath(String path) {
        this.path = path;
    }

}
