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
-- Table structure for table `file_paths`
--

DROP TABLE IF EXISTS `file_paths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_paths` (
  `file_path_id` bigint NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`file_path_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_paths`
--

LOCK TABLES `file_paths` WRITE;
/*!40000 ALTER TABLE `file_paths` DISABLE KEYS */;
INSERT INTO `file_paths` VALUES (1,'/threedmodels/ssafydesk.glb'),(2,'/threedmodels/gamingdesk.glb'),(3,'/threedmodels/sa300_1.glb'),(4,'/threedmodels/monitorstandssafy.glb'),(5,'/threedmodels/ssatbook.glb'),(6,'/threedmodels/ssatbookwithstand.glb'),(7,'/threedmodels/gaming_laptop.glb'),(8,'/threedmodels/gaminglaptopwithstand.glb'),(9,'/threedmodels/simple_pc_mouse.glb'),(10,'/threedmodels/logitech-g604.glb'),(11,'/threedmodels/logitech-g604_white.glb'),(12,'/threedmodels/apple_magic_mouse.glb'),(13,'/threedmodels/logicool_g913_tkl_gaming_keyboard.glb'),(14,'/threedmodels/apple_magic_keyboard.glb'),(15,'/threedmodels/car_example.glb'),(16,'/threedmodels/nametag.glb'),(17,'/threedmodels/tumbler_black.glb'),(18,'/threedmodels/pink_tumbler.glb'),(19,'/threedmodels/blue_tumbler.glb'),(20,'/threedmodels/tumbler_white.glb'),(21,'/threedmodels/longpad.glb'),(22,'/threedmodels/mousepad_ssafy.glb'),(23,'/threedmodels/headset.glb'),(24,'/threedmodels/penholder.glb');
/*!40000 ALTER TABLE `file_paths` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:54:07
