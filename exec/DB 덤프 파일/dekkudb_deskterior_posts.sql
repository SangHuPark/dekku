-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: dekku.co.kr    Database: dekkudb
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `deskterior_posts`
--

DROP TABLE IF EXISTS `deskterior_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deskterior_posts` (
  `deskterior_post_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `color` enum('BLACK','BLACK_AND_WHITE','BLUE','BROWN','ETC','GRAY','GREEN','MINT','NON_SELECT','PINK','RED','WHITE','YELLOW') DEFAULT NULL,
  `job` enum('ARCHITECT','DESIGNER','DEVELOPER','EDITOR','ETC','FREELANCER','HOMEMAKER','NON_SELECT','OFFICE_WORKER','STUDENT','WRITER') DEFAULT NULL,
  `style` enum('ETC','GAMER','LIBRARY','LOVELY','MINIMAL','MODERN','NATURE','NON_SELECT','RETRO') DEFAULT NULL,
  `like_count` int NOT NULL,
  `open_status` enum('CLOSED','OPENED') DEFAULT NULL,
  `thumnail_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `view_count` int NOT NULL,
  `member_id` bigint DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `comment_count` int NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`deskterior_post_id`),
  KEY `FKdr2jjogqeuuru8tk3qihjkjgh` (`member_id`),
  CONSTRAINT `FKdr2jjogqeuuru8tk3qihjkjgh` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deskterior_posts`
--

LOCK TABLES `deskterior_posts` WRITE;
/*!40000 ALTER TABLE `deskterior_posts` DISABLE KEYS */;
INSERT INTO `deskterior_posts` VALUES (45,'2024-08-14 19:08:46.000000','2024-08-16 10:53:42.722134','a','NON_SELECT','NON_SELECT','RETRO',1,'CLOSED',NULL,'a',255,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/14e410dc-4afb-430b-8b74-a2c669ed2696'),(46,'2024-08-14 19:09:55.000000','2024-08-16 10:40:32.222280','qwe','NON_SELECT','NON_SELECT','MINIMAL',0,'OPENED',NULL,'qwe',157,3,NULL,2,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/bb96c69a-1d9d-475c-a977-413cc66c4132'),(47,'2024-08-14 19:35:27.000000','2024-08-16 05:22:40.778570','ㅋㅋ','WHITE','ARCHITECT','MINIMAL',0,'OPENED',NULL,'슈웃',38,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/f3694fce-e916-4d11-83b4-e09c488f0963'),(48,'2024-08-14 19:36:32.000000','2024-08-16 05:22:40.681600','ㅋㅋ','WHITE','ARCHITECT','MINIMAL',1,'OPENED',NULL,'슈웃',50,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/34a04ceb-72ea-47bd-8682-fbc11d4edd9a'),(49,'2024-08-14 19:36:57.000000','2024-08-16 05:22:40.850831','ㅋㅋ','WHITE','ARCHITECT','MINIMAL',0,'OPENED',NULL,'슈웃',40,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/c0d63bc8-30de-4d23-9b4b-c6fc0bfad87b'),(50,'2024-08-14 19:38:25.000000','2024-08-16 10:51:53.302766','ㅋㅋ','WHITE','EDITOR','RETRO',0,'OPENED',NULL,'ㅋㅋ',42,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/aa93c892-2ca4-4c18-b48d-4d4bfa03a3d0'),(51,'2024-08-14 19:38:28.000000','2024-08-16 10:51:53.415624','ㅋㅋ','WHITE','EDITOR','RETRO',0,'OPENED',NULL,'ㅋㅋ',36,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/0cebfcf5-7f69-4950-8f52-c7a45dd1fe0e'),(52,'2024-08-14 19:40:13.000000','2024-08-16 09:04:44.042177','ㅋㅋ','WHITE','EDITOR','RETRO',0,'OPENED',NULL,'ㅋㅋ',54,3,NULL,1,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/12930032-8a1c-4d31-95c2-99a8ad61d918'),(53,'2024-08-15 06:58:31.000000','2024-08-16 05:25:10.561368','게시글 잘 올라가는지 확인여','BLACK','DESIGNER','MINIMAL',0,'OPENED',NULL,'게시글이 잘 올라가는지',86,4,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/0571809d-1dd1-4d20-9ad6-e6a5a95af1b0'),(54,'2024-08-15 18:47:03.000000','2024-08-16 05:25:10.476688','잘 꾸몄나요','BROWN','DEVELOPER','LIBRARY',0,'OPENED',NULL,'데꾸 화이팅~~',117,4,NULL,3,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/a165aeef-70f0-4567-82ac-5a12a2bc8fc1'),(55,'2024-08-16 03:43:22.463336','2024-08-16 05:25:10.623566','열받아','NON_SELECT','NON_SELECT','MINIMAL',0,'OPENED',NULL,'열받아',8,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9bfec4df-7bcf-4b9e-b8c6-d4ee4d3ef052a03e8707-5b59-408e-b09b-7b38161a76f0'),(56,'2024-08-16 03:45:18.865447','2024-08-16 10:52:03.448532','열받아','NON_SELECT','NON_SELECT','MINIMAL',0,'OPENED',NULL,'열받아',22,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f1c9eebb-448b-4119-97d2-c38c0e171e17ecf72eb5-0fc7-4ea5-85c8-b04a932025df'),(57,'2024-08-16 03:45:33.661837','2024-08-16 05:10:07.505037','열받아','NON_SELECT','NON_SELECT','MINIMAL',0,'OPENED',NULL,'열받아',72,3,NULL,1,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9f97cce8-5b07-4b7a-a79a-797914c78db5e017a82c-295c-4b99-b9c2-1506574c8af1'),(58,'2024-08-16 03:46:31.429015','2024-08-16 09:45:58.392315','ㅁㅁ','NON_SELECT','EDITOR','NON_SELECT',1,'OPENED',NULL,'ㅁㅁ',77,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f9236d07-03aa-4eab-b609-654c7dced44a852dbce5-1f48-442b-a7dc-605a51ef5eb7'),(59,'2024-08-16 04:07:43.087746','2024-08-16 10:53:07.847427','그리고 싸트북들','BLACK_AND_WHITE','DEVELOPER','MODERN',1,'OPENED',NULL,'트리플모니터',146,1,NULL,4,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7e6607bb-e133-4a3d-8c15-2cd94661e19e6aae429f-66f0-45fc-90a2-a1f06e14e192'),(60,'2024-08-16 04:08:58.164000','2024-08-16 10:04:37.797274','훈남','PINK','HOMEMAKER','LOVELY',2,'OPENED',NULL,'권주안',98,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/c2ac40d8-3511-4b14-aad6-20b251f91358c45310c5-8d4c-442e-9d69-375dae362945'),(61,'2024-08-16 06:48:36.531997','2024-08-16 10:04:36.004633','잘 올라가는지','BLACK','DEVELOPER','GAMER',0,'OPENED',NULL,'게시글',13,4,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/974d8bbc-0464-4fa4-a87c-e50b169b3517793d61f6-279c-4695-915e-a40dc1bfcca5'),(62,'2024-08-16 09:35:18.255209','2024-08-16 10:04:33.678957','ㅋㅌㅊ','NON_SELECT','NON_SELECT','NON_SELECT',0,'OPENED',NULL,'ㅋㅌㅊ',1,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/b7bf6211-b5f9-480a-bcfc-18a29e909f68'),(63,'2024-08-16 09:37:04.501734','2024-08-16 10:04:24.563797','ㅎㅇㅎㅇ','WHITE','DESIGNER','MINIMAL',0,'OPENED',NULL,'ㅎㅇㅎㅇ',7,4,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f0d3bf57-3d2d-4a3e-8f87-7b1f8d1bdd055898a39c-d4eb-4281-b43b-e6fb0a9dca79'),(64,'2024-08-16 09:50:33.066976','2024-08-16 10:04:14.186291','ㅇㅇ','NON_SELECT','NON_SELECT','NON_SELECT',0,'OPENED',NULL,'화질검사',4,3,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7c72df67-9405-49de-8a45-770871dd1afd7009df0a-ddb3-482b-abe2-59b7e725074b'),(65,'2024-08-16 10:03:56.798049','2024-08-16 10:08:01.825053','코딩24시간','BLACK_AND_WHITE','DEVELOPER','MODERN',0,'OPENED',NULL,'김싸피의 하루',5,4,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9ee615a8-24a0-44b8-9850-19f52341ce37a09e8d1d-98f1-4256-b908-ebd15812fc94'),(66,'2024-08-16 10:07:16.686189','2024-08-16 10:08:30.676215','텀블러 빌런','WHITE','DEVELOPER','RETRO',0,'OPENED',NULL,'텀블러',6,4,NULL,0,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/aebed773-94e0-4155-bb0b-6ad03c0a023f');
/*!40000 ALTER TABLE `deskterior_posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:54:05
