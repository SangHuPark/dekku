package dekku.spring_dekku.domain.deskterior_post.service;

import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeskteriorPostService {

    @Autowired
    private DeskteriorPostRepository deskteriorPostRepository;

    public List<DeskteriorPost> findAll() {
        return deskteriorPostRepository.findAll();
    }

    public Optional<DeskteriorPost> findById(Long postId) {
        return deskteriorPostRepository.findById(postId);
    }

    public DeskteriorPost save(DeskteriorPost post) {
        return deskteriorPostRepository.save(post);
    }

    public void deleteById(Long postId) {
        deskteriorPostRepository.deleteById(postId);
    }

    public List<DeskteriorPost> findPostsByTitleContaining(String keyword) {
        return deskteriorPostRepository.findPostsByTitleContaining(keyword);
    }
}
