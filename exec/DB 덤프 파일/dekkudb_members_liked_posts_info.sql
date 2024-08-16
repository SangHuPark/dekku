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
-- Table structure for table `members_liked_posts_info`
--

DROP TABLE IF EXISTS `members_liked_posts_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members_liked_posts_info` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `deskterior_post_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FKswky3nh9hq62cj54qix5sqav3` (`deskterior_post_id`),
  KEY `FKn59ovwbo0n33gvfbsmrdw80mv` (`member_id`),
  CONSTRAINT `FKn59ovwbo0n33gvfbsmrdw80mv` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKswky3nh9hq62cj54qix5sqav3` FOREIGN KEY (`deskterior_post_id`) REFERENCES `deskterior_posts` (`deskterior_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_liked_posts_info`
--

LOCK TABLES `members_liked_posts_info` WRITE;
/*!40000 ALTER TABLE `members_liked_posts_info` DISABLE KEYS */;
INSERT INTO `members_liked_posts_info` VALUES (50,45,5),(54,60,1),(58,58,3),(59,59,3),(60,60,3),(61,48,5),(63,45,3);
/*!40000 ALTER TABLE `members_liked_posts_info` ENABLE KEYS */;
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
