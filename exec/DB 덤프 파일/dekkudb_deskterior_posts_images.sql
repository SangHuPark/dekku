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
-- Table structure for table `deskterior_posts_images`
--

DROP TABLE IF EXISTS `deskterior_posts_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deskterior_posts_images` (
  `deskterior_posts_images_id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `deskterior_post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`deskterior_posts_images_id`),
  KEY `FKf31iqw8dgpsdbq5aaicf2bqh3` (`deskterior_post_id`),
  CONSTRAINT `FKf31iqw8dgpsdbq5aaicf2bqh3` FOREIGN KEY (`deskterior_post_id`) REFERENCES `deskterior_posts` (`deskterior_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deskterior_posts_images`
--

LOCK TABLES `deskterior_posts_images` WRITE;
/*!40000 ALTER TABLE `deskterior_posts_images` DISABLE KEYS */;
INSERT INTO `deskterior_posts_images` VALUES (46,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/14e410dc-4afb-430b-8b74-a2c669ed2696',45),(47,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/bb96c69a-1d9d-475c-a977-413cc66c4132',46),(48,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/f3694fce-e916-4d11-83b4-e09c488f0963',47),(49,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/34a04ceb-72ea-47bd-8682-fbc11d4edd9a',48),(50,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/c0d63bc8-30de-4d23-9b4b-c6fc0bfad87b',49),(51,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/aa93c892-2ca4-4c18-b48d-4d4bfa03a3d0',50),(52,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/0cebfcf5-7f69-4950-8f52-c7a45dd1fe0e',51),(53,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/12930032-8a1c-4d31-95c2-99a8ad61d918',52),(54,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/0571809d-1dd1-4d20-9ad6-e6a5a95af1b0',53),(55,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/a165aeef-70f0-4567-82ac-5a12a2bc8fc1',54),(56,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9bfec4df-7bcf-4b9e-b8c6-d4ee4d3ef052a03e8707-5b59-408e-b09b-7b38161a76f0',55),(57,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9bfec4df-7bcf-4b9e-b8c6-d4ee4d3ef052',55),(58,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f1c9eebb-448b-4119-97d2-c38c0e171e17ecf72eb5-0fc7-4ea5-85c8-b04a932025df',56),(59,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f1c9eebb-448b-4119-97d2-c38c0e171e17',56),(60,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9f97cce8-5b07-4b7a-a79a-797914c78db5e017a82c-295c-4b99-b9c2-1506574c8af1',57),(61,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9f97cce8-5b07-4b7a-a79a-797914c78db5',57),(62,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f9236d07-03aa-4eab-b609-654c7dced44a852dbce5-1f48-442b-a7dc-605a51ef5eb7',58),(63,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f9236d07-03aa-4eab-b609-654c7dced44a',58),(64,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7e6607bb-e133-4a3d-8c15-2cd94661e19e6aae429f-66f0-45fc-90a2-a1f06e14e192',59),(65,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7e6607bb-e133-4a3d-8c15-2cd94661e19e',59),(66,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/c2ac40d8-3511-4b14-aad6-20b251f91358c45310c5-8d4c-442e-9d69-375dae362945',60),(67,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/c2ac40d8-3511-4b14-aad6-20b251f91358',60),(68,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/974d8bbc-0464-4fa4-a87c-e50b169b3517793d61f6-279c-4695-915e-a40dc1bfcca5',61),(69,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/974d8bbc-0464-4fa4-a87c-e50b169b3517',61),(70,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/b7bf6211-b5f9-480a-bcfc-18a29e909f68',62),(71,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f0d3bf57-3d2d-4a3e-8f87-7b1f8d1bdd055898a39c-d4eb-4281-b43b-e6fb0a9dca79',63),(72,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/f0d3bf57-3d2d-4a3e-8f87-7b1f8d1bdd05',63),(73,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7c72df67-9405-49de-8a45-770871dd1afd7009df0a-ddb3-482b-abe2-59b7e725074b',64),(74,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/7c72df67-9405-49de-8a45-770871dd1afd',64),(75,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9ee615a8-24a0-44b8-9850-19f52341ce37a09e8d1d-98f1-4256-b908-ebd15812fc94',65),(76,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/3d/yourMemberId/9ee615a8-24a0-44b8-9850-19f52341ce37',65),(77,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/post/memberId/aebed773-94e0-4155-bb0b-6ad03c0a023f',66);
/*!40000 ALTER TABLE `deskterior_posts_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:54:06
