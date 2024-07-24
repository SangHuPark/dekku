package dekku.spring_dekku.domain.dekku.service;

import dekku.spring_dekku.domain.dekku.repository.ThreeDFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThreeDFileServiceImpl implements ThreeDFileService {

    private final ThreeDFileRepository threeDFileRepository;
}
