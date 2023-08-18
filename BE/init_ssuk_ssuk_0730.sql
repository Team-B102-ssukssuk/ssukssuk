DROP DATABASE IF EXISTS ssuk_ssuk;

CREATE DATABASE  IF NOT EXISTS `ssuk_ssuk` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ssuk_ssuk`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: ssuk_ssuk
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `badge_id` int NOT NULL AUTO_INCREMENT,
  `badge_name` varchar(30) NOT NULL COMMENT '업적 이름',
  `badge_condition` varchar(100) NOT NULL COMMENT '업적 획득 조건 설명',
  `description` varchar(100) NOT NULL COMMENT '업적 획득 후 표시할 설명',
  `is_hidden` tinyint(1) NOT NULL DEFAULT '0' COMMENT '히든 업적 플래그(없어도 되면 말구)',
  `badge_image` varchar(40) NOT NULL COMMENT '업적 뱃지 이미지',
  PRIMARY KEY (`badge_id`),
  UNIQUE KEY `badge_name` (`badge_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `user_id` int NOT NULL,
  `plant_id` int NOT NULL,
  `level` tinyint NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '유저가 해당 컬렉션을 활성화한 날짜',
  PRIMARY KEY (`user_id`,`plant_id`,`level`),
  KEY `FK_plant_info_TO_collection_1` (`plant_id`,`level`),
  CONSTRAINT `FK_plant_info_TO_collection_1` FOREIGN KEY (`plant_id`, `level`) REFERENCES `plant_info` (`plant_id`, `level`),
  CONSTRAINT `FK_user_TO_collection_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garden`
--

DROP TABLE IF EXISTS `garden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garden` (
  `garden_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pot_id` int NOT NULL,
  `plant_id` int NOT NULL,
  `level` tinyint NOT NULL DEFAULT '1' COMMENT '해당 화분에 심어진 식물의 성장 단계',
  `plant_nickname` varchar(30) NOT NULL COMMENT '해당 화분에 심어진 식물의 애칭',
  `is_use` tinyint(1) NOT NULL DEFAULT '1' COMMENT '현재 화분에 있는지 상태 표시',
  `first_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '화분에 식물이 심어진 날짜',
  `second_date` datetime DEFAULT NULL COMMENT '2단계 갱신 날짜',
  `third_date` datetime DEFAULT NULL COMMENT '3단계 갱신 날짜',
  PRIMARY KEY (`garden_id`,`user_id`,`pot_id`,`plant_id`),
  KEY `FK_user_TO_garden_1` (`user_id`),
  KEY `FK_pot_TO_garden_1` (`pot_id`),
  CONSTRAINT `FK_pot_TO_garden_1` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`),
  CONSTRAINT `FK_user_TO_garden_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garden`
--

LOCK TABLES `garden` WRITE;
/*!40000 ALTER TABLE `garden` DISABLE KEYS */;
/*!40000 ALTER TABLE `garden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement` (
  `measurement_id` int NOT NULL AUTO_INCREMENT,
  `pot_id` int NOT NULL,
  `measurement_value` float(6,2) NOT NULL COMMENT '센서의 측정값 / 0000.00',
  `measurement_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '센서값 측정 시간',
  `sensor_type` char(1) NOT NULL COMMENT 'T : temparature / H : Hu.... / M : moisture',
  PRIMARY KEY (`measurement_id`,`pot_id`),
  KEY `FK_pot_TO_measurement_1` (`pot_id`),
  CONSTRAINT `FK_pot_TO_measurement_1` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement`
--

LOCK TABLES `measurement` WRITE;
/*!40000 ALTER TABLE `measurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `garden_id` int NOT NULL,
  `pot_id` int NOT NULL,
  `text` varchar(100) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'true면 표시',
  `notification_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '알림 발송 시간',
  `check_date` datetime DEFAULT NULL COMMENT '알림 확인 시간',
  PRIMARY KEY (`notification_id`,`user_id`,`garden_id`,`pot_id`),
  KEY `FK_user_TO_notification_1` (`user_id`),
  KEY `FK_garden_TO_notification_2` (`pot_id`),
  CONSTRAINT `FK_garden_TO_notification_2` FOREIGN KEY (`pot_id`) REFERENCES `garden` (`pot_id`),
  CONSTRAINT `FK_user_TO_notification_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `garden_id` int NOT NULL,
  `pot_id` int NOT NULL,
  `plant_image` varchar(40) NOT NULL COMMENT '사진 저장 파일명',
  `photo_date` datetime NOT NULL COMMENT '촬영한 날짜',
  `check_event` tinyint NOT NULL DEFAULT '0' COMMENT '0은 무시 1은 1단계, 2는 2단계, 3은 3단계',
  PRIMARY KEY (`photo_id`,`garden_id`,`pot_id`),
  KEY `FK_garden_TO_photo_1` (`garden_id`),
  KEY `FK_garden_TO_photo_2` (`pot_id`),
  CONSTRAINT `FK_garden_TO_photo_1` FOREIGN KEY (`garden_id`) REFERENCES `garden` (`garden_id`),
  CONSTRAINT `FK_garden_TO_photo_2` FOREIGN KEY (`pot_id`) REFERENCES `garden` (`pot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant`
--

DROP TABLE IF EXISTS `plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant` (
  `plant_id` int NOT NULL AUTO_INCREMENT,
  `category_id` tinyint NOT NULL,
  `plant_name` varchar(20) NOT NULL COMMENT '식물의 이름',
  `temp_max` float(6,2) NOT NULL COMMENT '해당 식물의 최대 생육 온도',
  `temp_min` float(6,2) NOT NULL COMMENT '해당 식물의 최저 생육 온도',
  `moisture_max` float(6,2) NOT NULL COMMENT '해당 식물의 최대 토양 수분',
  `moisture_min` float(6,2) NOT NULL COMMENT '해당 식물의 최소 토양 수분',
  PRIMARY KEY (`plant_id`,`category_id`),
  UNIQUE KEY `plant_name` (`plant_name`),
  KEY `FK_plant_category_TO_plant_1` (`category_id`),
  CONSTRAINT `FK_plant_category_TO_plant_1` FOREIGN KEY (`category_id`) REFERENCES `plant_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant`
--

LOCK TABLES `plant` WRITE;
/*!40000 ALTER TABLE `plant` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_category`
--

DROP TABLE IF EXISTS `plant_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_category` (
  `category_id` tinyint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL COMMENT '식물 분류명',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_category`
--

LOCK TABLES `plant_category` WRITE;
/*!40000 ALTER TABLE `plant_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_info`
--

DROP TABLE IF EXISTS `plant_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plant_info` (
  `plant_id` int NOT NULL,
  `level` tinyint NOT NULL COMMENT '캐릭터의 성장단계 (1 ~ 3)',
  `plant_guide` varchar(512) NOT NULL COMMENT '해당 단계의 생장 가이드',
  `water_term` int NOT NULL COMMENT '해당 단계의 물 주기 주기 (period)',
  `water_amount` int NOT NULL COMMENT '해당 단계의 1회 관수량 (ml)',
  `character_name` varchar(30) NOT NULL COMMENT '캐릭터의 이름',
  `character_comment` varchar(100) NOT NULL COMMENT '캐릭터의 대사',
  `character_image` varchar(40) NOT NULL COMMENT '캐릭터 이미지 파일명',
  PRIMARY KEY (`plant_id`,`level`),
  CONSTRAINT `FK_plant_TO_plant_info_1` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`plant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_info`
--

LOCK TABLES `plant_info` WRITE;
/*!40000 ALTER TABLE `plant_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot`
--

DROP TABLE IF EXISTS `pot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot` (
  `pot_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `serial_number` char(8) NOT NULL COMMENT 'unique- 화분이 가지고 있는 고유 시리얼 넘버(16진법)',
  `registed_date` datetime DEFAULT NULL COMMENT '화분을 등록한 일시',
  `last_water_time` datetime DEFAULT NULL COMMENT '화분에 마지막으로 물을 준 일시',
  `is_registed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '화분 등록 여부',
  PRIMARY KEY (`pot_id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot`
--

LOCK TABLES `pot` WRITE;
/*!40000 ALTER TABLE `pot` DISABLE KEYS */;
/*!40000 ALTER TABLE `pot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL COMMENT '로그인에 활용되는 유저 이메일',
  `password` char(64) NOT NULL COMMENT '로그인에 활용되는 비밀번호- 암호화(SHA 256)되서 저장',
  `user_nickname` varchar(30) NOT NULL COMMENT '유저가 서비스에서 사용될 닉네임',
  `profile_image` varchar(40) NOT NULL DEFAULT 'default' COMMENT '유저의 프로필 이미지 저장 파일명',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '유저의 회원가입 날짜 및 시간',
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '유저의 개인 정보가 마지막으로 수정 된 날짜 및 시간',
  `is_validated` tinyint(1) NOT NULL DEFAULT '1' COMMENT '유저의 계정 유효 여부- 탈퇴 시 1에서 0으로 수정',
  `plant_count` int NOT NULL DEFAULT '0' COMMENT '유저의 전체 식물 등록 횟수 (중복 O)',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_nickname` (`user_nickname`),
  UNIQUE INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badge`
--

DROP TABLE IF EXISTS `user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badge` (
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`badge_id`),
  KEY `FK_badge_TO_user_badge_1` (`badge_id`),
  CONSTRAINT `FK_badge_TO_user_badge_1` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`badge_id`),
  CONSTRAINT `FK_user_TO_user_badge_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badge`
--

LOCK TABLES `user_badge` WRITE;
/*!40000 ALTER TABLE `user_badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_badge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-30 18:40:52
