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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category` enum('DESK','ETC','KEYBOARD','LAPTOP','MONITOR','MOUSE') DEFAULT NULL,
  `exist_status` enum('EXIST','NOT_EXIST') DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `sales_link` varchar(255) DEFAULT NULL,
  `file_path_id` bigint DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `scale` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `UKijriagwjxbvlh8o818v6323p9` (`file_path_id`),
  CONSTRAINT `FKbxb2kk4p48vh2j2eoocm2gx48` FOREIGN KEY (`file_path_id`) REFERENCES `file_paths` (`file_path_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2024-08-14 13:19:59.000000','2024-08-14 13:19:59.000000','DESK',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/ssafydesk.png','싸피 책상','0','',1,'싸피 국룰 책상',''),(2,'2024-08-14 18:35:35.000000','2024-08-14 18:35:35.000000','DESK',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/gamingdesk.png','블랙 간지 게이밍 책상','0','',2,'쿠팡 1위 상품',''),(3,'2024-08-14 19:24:58.000000','2024-08-14 19:24:58.000000','MONITOR',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/syncmaster_sa300.png','삼성 SyncMaster SA300','175,000','',3,'LCD 모니터','3, 3, 3'),(4,'2024-08-14 19:26:44.000000','2024-08-14 19:26:44.000000','MONITOR',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/monitorstandssafy.png','서브 모니터','0','',4,'모니터 거치대 연결','0.4, 0.4, 0.4'),(5,'2024-08-14 10:48:46.000000','2024-08-14 10:48:46.000000','LAPTOP',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/%EA%B0%A4%EB%9F%AD%EC%8B%9C%EB%B6%81%ED%94%84%EB%A1%9C4.PNG','samsung Galaxy Book4','1,460,000','',5,'NT750XGK-KD51G','1, 1, 1'),(6,'2024-08-14 10:51:59.000000','2024-08-14 10:51:59.000000','LAPTOP',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/ssatbookwithstand.png','samsung Galaxy Book4','1,460,000','',6,'NT750XGK-KD51G','1, 1, 1'),(7,'2024-08-14 12:58:41.000000','2024-08-14 12:58:41.000000','LAPTOP',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/%EA%B2%8C%EC%9D%B4%EB%B0%8D%EB%85%B8%ED%8A%B8%EB%B6%81.PNG','삼성 오디세이','2,250,000','',7,'NT850XBX-GD7A','0.2, 0.2, 0.2'),(8,'2024-08-14 13:01:45.000000','2024-08-14 13:01:45.000000','LAPTOP',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/gaminglaptopwithstand.png','삼성 오디세이','2,250,000','',8,'NT850XBX-GD7A','0.2, 0.2, 0.2'),(9,'2024-08-14 13:02:46.000000','2024-08-14 13:02:46.000000','MOUSE',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/%EC%82%BC%EC%84%B1%EB%AC%B4%EC%84%A0%EB%A7%88%EC%9A%B0%EC%8A%A4.PNG','삼성 무선 마우스','10,000','',9,'black color','1.2, 1.2, 1.2'),(10,'2024-08-14 13:03:38.000000','2024-08-14 13:03:38.000000','MOUSE',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/logitech_g604.PNG','로지텍 G604 black','117,190','',10,'LIGHTSPEED WIRELESS','2.5, 2.5, 2.5'),(11,'2024-08-14 13:05:13.000000','2024-08-14 13:05:13.000000','MOUSE',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/logitech-g604_white.png','로지텍 G604 white','117,190','',11,'LIGHTSPEED WIRELESS','2.5, 2.5, 2.5'),(12,'2024-08-14 13:06:11.000000','2024-08-14 13:06:11.000000','MOUSE',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/magicmouse.PNG','애플 매직 마우스','99,000','',12,'Magic Mouse 2','2, 2, 2'),(13,'2024-08-14 13:08:02.000000','2024-08-14 13:08:02.000000','KEYBOARD',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/logitech_g913.PNG','로지텍 텐키리스 키보드','199,000','',13,'Logitech G913 Wireless TKL','3, 3, 3'),(14,'2024-08-14 13:08:59.000000','2024-08-14 13:08:59.000000','KEYBOARD',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/magickeyboard.PNG','애플 매직 키보드','149,000','',14,'WITH NUMERIC KEYPAD','0.2, 0.4, 0.2'),(15,'2024-08-14 13:10:19.000000','2024-08-14 13:10:19.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/%ED%8C%8C%EB%9E%80%EC%83%89%EC%9E%90%EB%8F%99%EC%B0%A8.png','미니 자동차','200,000','',15,'고퀄 파란색 자동차','0.03, 0.03, 0.03'),(16,'2024-08-14 13:11:40.000000','2024-08-14 13:11:40.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/nametag.png','SSAFY 명패','0','',16,'싸피인의 필수품','2, 2, 2'),(17,'2024-08-14 13:12:49.000000','2024-08-14 13:12:49.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/tumbler_black.png','텀블러 검정','0','',17,'black','0.8, 0.8, 0.8'),(18,'2024-08-14 13:13:10.000000','2024-08-14 13:13:10.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/pink_tumbler.png','텀블러 핑크','0','',18,'pink','0.8, 0.8, 0.8'),(19,'2024-08-14 13:13:44.000000','2024-08-14 13:13:44.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/blue_tumbler.png','텀블러 파랑','0','',19,'blue','0.8, 0.8, 0.8'),(20,'2024-08-14 13:14:26.000000','2024-08-14 13:14:26.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/tumbler_white.png','텀블러 하양','0','',20,'white','0.8, 0.8, 0.8'),(21,'2024-08-14 13:15:15.000000','2024-08-14 13:15:15.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/longpad.png','장패드','5,000','',21,'근본 black-red','7, 1, 6'),(22,'2024-08-14 13:16:11.000000','2024-08-14 13:16:11.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/mousepad_ssafy.png','마우스패드','10,000','',22,'무려 ssafy 로고가 박힌','3, 1, 3'),(23,'2024-08-14 13:16:54.000000','2024-08-14 13:16:54.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/headset.png','게이밍 헤드셋','74,140','',23,'RAZER Kraken V3 X','0.05, 0.05, 0.05'),(24,'2024-08-14 13:17:38.000000','2024-08-14 13:17:38.000000','ETC',NULL,'https://dekku-bucket.s3.ap-northeast-2.amazonaws.com/products/penholder.png','볼펜꽂이','3,000','',24,'black, mesh','0.15, 0.15, 0.15');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:54:09
