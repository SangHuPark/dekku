package dekku.spring_dekku.infra.aws.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import dekku.spring_dekku.infra.aws.model.dto.response.CreatePresignedUrlResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static dekku.spring_dekku.global.format.NumberFormat.PRE_SIGNED_URL_EXPIRATION_TIME;
import static dekku.spring_dekku.global.format.StringFormat.S3_OBJECT_PATH;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public CreatePresignedUrlResponseDto generatePreSignedUrl(String id, int number, String directory) {

        
        log.info("Pre-signed Url 생성 시작");

        StringBuilder path = new StringBuilder(String.format(S3_OBJECT_PATH, directory, id));

        // object-key 생성
        List<String> objectKeys = createObjectKeys(number, path);

        // pre-signed URL 생성
        List<String> preSignedUrls = createPreSignedUrls(objectKeys);

        log.info("Pre-signed Url 생성 완료");

        return CreatePresignedUrlResponseDto.of(preSignedUrls);

    }

    private List<String> createObjectKeys(int fileCount, StringBuilder path) {

        List<String> objectKeys = new ArrayList<>();

        for (int keyIdx = 0; keyIdx < fileCount; keyIdx++) {
            objectKeys.add(String.valueOf(path.append(UUID.randomUUID())));
        }

        return objectKeys;

    }

    private List<String> createPreSignedUrls(List<String> objectKeys) {

        List<String> preSignedUrls = new ArrayList<>();
        Date expirationDate = getExpiration(PRE_SIGNED_URL_EXPIRATION_TIME);

        GeneratePresignedUrlRequest generatePresignedUrlRequest;

        for (String objectKey : objectKeys) {
            generatePresignedUrlRequest
                    = new GeneratePresignedUrlRequest(bucketName, objectKey)
                    .withMethod(HttpMethod.PUT)
                    .withExpiration(expirationDate);

            generatePresignedUrlRequest.addRequestParameter(Headers.S3_CANNED_ACL,
                    CannedAccessControlList.PublicRead.toString());
            URL preSignedUrl = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);

            preSignedUrls.add(preSignedUrl.toString());
        }

        return preSignedUrls;

    }

    private Date getExpiration(Long expirationTime) {

        Date now = new Date();
        return new Date(now.getTime() + expirationTime);

    }
}
