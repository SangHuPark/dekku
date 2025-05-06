-- 데이터베이스 생성
DROP DATABASE dekku;

CREATE DATABASE IF NOT EXISTS dekku;

-- 데이터베이스 사용
USE dekku;

-- 테이블 생성
CREATE TABLE member_role (
                             role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             role_name VARCHAR(15) NOT NULL
);

CREATE TABLE member (
                        user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(20) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        name VARCHAR(20) NOT NULL,
                        nickname VARCHAR(30) NOT NULL,
                        phone VARCHAR(20) NOT NULL,
                        image_url VARCHAR(255),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        deleted_at TIMESTAMP NULL,
                        role_id BIGINT,
                        token VARCHAR(255) NULL,
                        CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES member_role(role_id)
);

CREATE TABLE follow (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        to_user_id BIGINT NOT NULL,
                        from_user_id BIGINT NOT NULL,
                        CONSTRAINT FK_to_user_id FOREIGN KEY (to_user_id) REFERENCES member(user_id),
                        CONSTRAINT FK_from_user_id FOREIGN KEY (from_user_id) REFERENCES member(user_id)
);

CREATE TABLE deskterior_image (
                                  deskterior_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  image_url TEXT
);

CREATE TABLE deskterior_post (
                                 post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 title VARCHAR(50) NOT NULL,
                                 thumbnail_url VARCHAR(255) NOT NULL,
                                 content TEXT,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 deskterior_image_id BIGINT,
                                 user_id BIGINT NOT NULL,
                                 CONSTRAINT FK_deskterior_image_id FOREIGN KEY (deskterior_image_id) REFERENCES deskterior_image(deskterior_image_id),
                                 CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES member(user_id)
);

CREATE TABLE member_stored_posts (
                                     stored_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     user_id BIGINT NOT NULL,
                                     post_id BIGINT NOT NULL,
                                     CONSTRAINT FK_user_id_stored FOREIGN KEY (user_id) REFERENCES member(user_id),
                                     CONSTRAINT FK_post_id FOREIGN KEY (post_id) REFERENCES deskterior_post(post_id)
);

CREATE TABLE product_class (
                               product_class_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                               class_name VARCHAR(15)
);

CREATE TABLE product (
                         product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         price INT,
                         image_url VARCHAR(255),
                         status3D BOOLEAN,
                         product_class_id BIGINT,
                         CONSTRAINT FK_product_class_id FOREIGN KEY (product_class_id) REFERENCES product_class(product_class_id)
);

CREATE TABLE posts_products_info (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     product_id BIGINT NOT NULL,
                                     post_id BIGINT NOT NULL,
                                     CONSTRAINT FK_product_id FOREIGN KEY (product_id) REFERENCES product(product_id),
                                     CONSTRAINT FK_post_id_info FOREIGN KEY (post_id) REFERENCES deskterior_post(post_id)
);

CREATE TABLE object_path (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             path VARCHAR(50),
                             product_id BIGINT NOT NULL,
                             CONSTRAINT FK_product_id_path FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE file3d (
                        file_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        gltf_url VARCHAR(255) NOT NULL,
                        thumbnail_url VARCHAR(255),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        user_id BIGINT NOT NULL,
                        CONSTRAINT FK_user_id_file FOREIGN KEY (user_id) REFERENCES member(user_id)
);

-- 예시 데이터 삽입
INSERT INTO member_role (role_name) VALUES ('USER'), ('ADMIN');

INSERT INTO member (email, password, name, nickname, phone, role_id) VALUES
                                                                         ('user1@example.com', 'password1', 'User One', 'userone', '010-1234-5678', 1),
                                                                         ('user2@example.com', 'password2', 'User Two', 'usertwo', '010-2345-6789', 1),
                                                                         ('admin@example.com', 'adminpass', 'Admin User', 'admin', '010-3456-7890', 2);

INSERT INTO follow (to_user_id, from_user_id) VALUES
                                                  (1, 2),
                                                  (2, 1);

INSERT INTO deskterior_image (image_url) VALUES
                                             ('http://example.com/image1.jpg'),
                                             ('http://example.com/image2.jpg');

INSERT INTO deskterior_post (title, thumbnail_url, content, deskterior_image_id, user_id) VALUES
                                                                                              ('Post Title 1', 'http://example.com/thumb1.jpg', 'Content of the first post', 1, 1),
                                                                                              ('Post Title 2', 'http://example.com/thumb2.jpg', 'Content of the second post', 2, 2);

INSERT INTO member_stored_posts (user_id, post_id) VALUES
                                                       (1, 1),
                                                       (2, 2);

INSERT INTO product_class (class_name) VALUES ('Furniture'), ('Electronics');



INSERT INTO product (name, price, image_url, status3D, product_class_id) VALUES
                                                                             ('Product 1', 10000, 'http://example.com/product1.jpg', true, 1),
                                                                             ('Product 2', 20000, 'http://example.com/product2.jpg', false, 2);

INSERT INTO posts_products_info (product_id, post_id) VALUES
                                                          (1, 1),
                                                          (2, 2);

INSERT INTO object_path (path, product_id) VALUES
                                               ('path/to/object1', 1),
                                               ('path/to/object2', 2);

INSERT INTO file3d (gltf_url, thumbnail_url, user_id) VALUES
                                                          ('http://example.com/file1.gltf', 'http://example.com/thumb1.jpg', 1),
                                                          ('http://example.com/file2.gltf', 'http://example.com/thumb2.jpg', 2);

SELECT * FROM member;
SELECT * FROM member_role;