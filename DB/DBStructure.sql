-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: nvmcinema
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `area_id` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hostline` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3jvo1whj7anmv6crjl2g74xtj` (`area_id`),
  CONSTRAINT `FK3jvo1whj7anmv6crjl2g74xtj` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chair`
--

DROP TABLE IF EXISTS `chair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chair` (
  `deleted` bit(1) DEFAULT NULL,
  `max_row` int DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs980wwhxhhhjkqk174ryegjbm` (`room_id`),
  CONSTRAINT `FKs980wwhxhhhjkqk174ryegjbm` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `birthday` date DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_ADMIN_AREA','ROLE_STAFF','ROLE_CLIENT') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `combo_food`
--

DROP TABLE IF EXISTS `combo_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo_food` (
  `deleted` bit(1) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `created_at` datetime(6) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `movie_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkh7b1ibqumr31jlf124of15vy` (`client_id`),
  KEY `FKj6owqni09n6r5rspfx1xtfu23` (`movie_id`),
  CONSTRAINT `FKj6owqni09n6r5rspfx1xtfu23` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKkh7b1ibqumr31jlf124of15vy` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `age` int DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `format`
--

DROP TABLE IF EXISTS `format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `format` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `age_restriction` int DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `actor` varchar(255) DEFAULT NULL,
  `banner_id` varchar(255) DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `country_id` varchar(255) DEFAULT NULL,
  `description` longtext,
  `director_id` varchar(255) DEFAULT NULL,
  `format_id` varchar(255) DEFAULT NULL,
  `genre_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `video_path` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5h5hkyxprvsgpqg69nqsq5p48` (`country_id`),
  KEY `FKbi47w3cnsfi30gc1nu2avgra2` (`director_id`),
  KEY `FKgi23vk6v93wjs92oyqqpoapj5` (`format_id`),
  KEY `FK2ggat6246891h4goynp4h9lk5` (`genre_id`),
  CONSTRAINT `FK2ggat6246891h4goynp4h9lk5` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  CONSTRAINT `FK5h5hkyxprvsgpqg69nqsq5p48` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  CONSTRAINT `FKbi47w3cnsfi30gc1nu2avgra2` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`),
  CONSTRAINT `FKgi23vk6v93wjs92oyqqpoapj5` FOREIGN KEY (`format_id`) REFERENCES `format` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_detail_combofood`
--

DROP TABLE IF EXISTS `order_detail_combofood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail_combofood` (
  `quantity` int DEFAULT NULL,
  `combo_food_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7ix0hxrcu9rbex9665cdidf22` (`combo_food_id`),
  KEY `FK1q929mrlsf2vi7ug2xtwwjfh7` (`order_id`),
  CONSTRAINT `FK1q929mrlsf2vi7ug2xtwwjfh7` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FK7ix0hxrcu9rbex9665cdidf22` FOREIGN KEY (`combo_food_id`) REFERENCES `combo_food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_detail_ticketchair`
--

DROP TABLE IF EXISTS `order_detail_ticketchair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail_ticketchair` (
  `id` varchar(255) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `ticket_chair_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9lubg2buf414c6int4wa1obhn` (`order_id`),
  KEY `FKsv8pqo8roajkmcn296w1fgnky` (`ticket_chair_id`),
  CONSTRAINT `FK9lubg2buf414c6int4wa1obhn` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKsv8pqo8roajkmcn296w1fgnky` FOREIGN KEY (`ticket_chair_id`) REFERENCES `ticket_chair` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `formality` tinyint DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `promotion_event_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `order_status` enum('CHUA_DUYET','DA_DUYET','DA_HUY') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK17yo6gry2nuwg2erwhbaxqbs9` (`client_id`),
  KEY `FK4lg6cf3s1kglgm1byg3hwno5y` (`promotion_event_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK17yo6gry2nuwg2erwhbaxqbs9` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK4lg6cf3s1kglgm1byg3hwno5y` FOREIGN KEY (`promotion_event_id`) REFERENCES `promotion_event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `promotion_event`
--

DROP TABLE IF EXISTS `promotion_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_event` (
  `date_end` date DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `promotion_price` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `promotion_code` varchar(255) DEFAULT NULL,
  `status` enum('DA_HET_HAN','DANG_DIEN_RA','SAP_DIEN_RA') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `created_at` datetime(6) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `movie_id` varchar(255) DEFAULT NULL,
  `star` enum('ONE_STAR','TWO_STAR','THREE_STAR','FOUR_STAR','FIVE_STAR') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlqj5tbefenf3x3tnyk7o4cbge` (`client_id`),
  KEY `FKhr60xnk86b63dsdy7as98fms2` (`movie_id`),
  CONSTRAINT `FKhr60xnk86b63dsdy7as98fms2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKlqj5tbefenf3x3tnyk7o4cbge` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `branch_id` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3mf32q0hwpnmu7rf58gjtjrmj` (`branch_id`),
  CONSTRAINT `FK3mf32q0hwpnmu7rf58gjtjrmj` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `showtime`
--

DROP TABLE IF EXISTS `showtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtime` (
  `deleted` bit(1) DEFAULT NULL,
  `screening_date` date DEFAULT NULL,
  `ticket_price` decimal(38,2) DEFAULT NULL,
  `time_start` time(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `movie_id` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8i90asti16tydhva795c3qwj2` (`movie_id`),
  KEY `FK6xi8d7qa7ww5iaypsrc0gjpa8` (`room_id`),
  CONSTRAINT `FK6xi8d7qa7ww5iaypsrc0gjpa8` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `FK8i90asti16tydhva795c3qwj2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_chair`
--

DROP TABLE IF EXISTS `ticket_chair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_chair` (
  `status` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `chair_name` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `show_time_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi757xodmcc68gjxh3pn65br8x` (`show_time_id`),
  CONSTRAINT `FKi757xodmcc68gjxh3pn65br8x` FOREIGN KEY (`show_time_id`) REFERENCES `showtime` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `birthday` date DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `area_id` varchar(255) DEFAULT NULL,
  `cccd` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_ADMIN_AREA','ROLE_STAFF','ROLE_CLIENT') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiqs16mtikgwpdkjymojji25du` (`area_id`),
  CONSTRAINT `FKiqs16mtikgwpdkjymojji25du` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 11:30:49
