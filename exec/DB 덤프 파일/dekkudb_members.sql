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
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `age_range` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK9d30a9u1qpg8eou0otgkwrp5d` (`email`),
  UNIQUE KEY `UKe6u9u9ypoc7oldnpxdjwcdx3` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'2024-08-10 08:25:38.000000','2024-08-10 08:25:38.000000',20,'joajy@naver.com','','http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640','ㅋㅋ','재윤','재윤','ROLE_USER','kakao 3640526407'),(2,'2024-08-10 08:36:04.000000','2024-08-10 08:36:04.000000',20,'tkdgn407@naver.com','','http://k.kakaocdn.net/dn/zTl9d/btsGANfld8M/rPr3fu5dcel4MBfj6BKf01/img_640x640.jpg',NULL,'박상후','박상후','ROLE_USER','kakao 3654309081'),(3,'2024-08-10 09:36:12.000000','2024-08-10 09:36:12.000000',20,'ch05036@naver.com','','https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/profile/3/51b96f2d-5fec-4f1c-8137-a07e33a164af','ㅋㅌㅊ','김민수','김민수','ROLE_USER','kakao 3655844202'),(4,'2024-08-10 11:35:12.000000','2024-08-10 11:35:12.000000',20,'bat5225@gmail.com','','http://k.kakaocdn.net/dn/bEbzK7/btsFh7Mz6OD/PFARnTzKbLDAF2zmy5k0m0/img_640x640.jpg','ㅋㅋㅋㅋ','박지환','박지환','ROLE_USER','kakao 3653466011'),(5,'2024-08-11 08:20:28.000000','2024-08-11 08:20:28.000000',20,'wndks6450@naver.com','','https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/profile/5/5e727f67-1fd0-41e3-88d6-a534f0639e7e','ㅁㄴㅇㄹ','권주안','권주안','ROLE_USER','kakao 3654611181');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:54:08
