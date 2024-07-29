create database dekku;

use dekku;

CREATE TABLE deskterior_posts (
                                  post_id BIGINT NOT NULL AUTO_INCREMENT,
                                  title VARCHAR(50) NULL,
                                  thumbnail_url VARCHAR(255) NULL,
                                  content TEXT NULL,
                                  created_at TIMESTAMP NULL,
                                  modified_at TIMESTAMP NULL,
                                  deskterior_image_id BIGINT NOT NULL,
                                  user_id BIGINT NOT NULL,
                                  PRIMARY KEY (post_id)
);

INSERT INTO deskterior_posts (title, thumbnail_url, content, created_at, modified_at, deskterior_image_id, user_id)
VALUES
    ('First Post', 'http://example.com/image1.jpg', 'This is the content of the first post.', NOW(), NOW(), 1, 1),
    ('Second Post', 'http://example.com/image2.jpg', 'This is the content of the second post.', NOW(), NOW(), 2, 2),
    ('Third Post', 'http://example.com/image3.jpg', 'This is the content of the third post.', NOW(), NOW(), 3, 3);


select * from deskterior_posts;