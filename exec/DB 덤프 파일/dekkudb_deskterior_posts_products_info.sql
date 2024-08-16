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
-- Table structure for table `deskterior_posts_products_info`
--

DROP TABLE IF EXISTS `deskterior_posts_products_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deskterior_posts_products_info` (
  `deskterior_post_product_id` bigint NOT NULL AUTO_INCREMENT,
  `deskterior_post_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`deskterior_post_product_id`),
  KEY `FKsjbodn2n93k8oj6eg8b2i8j90` (`deskterior_post_id`),
  KEY `FK2nx93x4b4j6fo3dmjlow1olqy` (`product_id`),
  CONSTRAINT `FK2nx93x4b4j6fo3dmjlow1olqy` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `FKsjbodn2n93k8oj6eg8b2i8j90` FOREIGN KEY (`deskterior_post_id`) REFERENCES `deskterior_posts` (`deskterior_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deskterior_posts_products_info`
--

LOCK TABLES `deskterior_posts_products_info` WRITE;
/*!40000 ALTER TABLE `deskterior_posts_products_info` DISABLE KEYS */;
INSERT INTO `deskterior_posts_products_info` VALUES (1,45,9),(2,46,20),(3,47,20),(4,48,20),(5,49,20),(6,51,12),(7,52,12),(24,54,5),(25,54,9),(26,54,12),(27,55,3),(28,55,22),(29,56,3),(30,56,22),(31,57,3),(32,57,22),(33,58,22),(34,58,3),(35,58,3),(36,59,6),(37,59,3),(38,59,8),(39,60,3),(40,60,4),(41,60,22),(42,60,11),(43,60,16),(44,60,24),(45,60,13),(46,61,4),(47,61,3),(48,62,1),(49,63,12),(50,63,22),(51,63,14),(52,63,3),(53,63,4),(54,64,19),(55,64,5),(56,65,3),(57,65,4),(58,65,14),(59,65,19),(60,66,20),(61,66,18),(62,66,19),(63,66,17);
/*!40000 ALTER TABLE `deskterior_posts_products_info` ENABLE KEYS */;
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
