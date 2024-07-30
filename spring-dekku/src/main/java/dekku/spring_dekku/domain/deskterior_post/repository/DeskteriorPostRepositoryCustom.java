package dekku.spring_dekku.domain.deskterior_post.repository;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorAttributes;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorImage;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.model.type.Color;
import dekku.spring_dekku.domain.deskterior_post.model.type.Job;
import dekku.spring_dekku.domain.deskterior_post.model.type.Status;
import dekku.spring_dekku.domain.deskterior_post.model.type.Style;

import java.util.List;

public interface DeskteriorPostRepositoryCustom {
    List<DeskteriorPost> findByTitleContaining(String keyword);
    void updatePost(Long id, String title, String thumbnailUrl, String content, DeskteriorImage deskteriorImage, DeskteriorAttributes deskteriorAttributes, int viewCount, int likeCount, Status status);
    List<DeskteriorPost> findPostsByFilters(Style style, Color color, Job job);
}
