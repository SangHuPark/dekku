package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;

import java.util.List;

public interface DeskteriorPostRepositoryCustom {
    List<DeskteriorPost> findByTitleContaining(String keyword);
    void updatePost(Long id, String title, String thumbnailUrl, String content, DeskteriorImage deskteriorImage);
}
