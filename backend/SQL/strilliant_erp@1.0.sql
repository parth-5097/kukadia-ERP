-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: strilliant_erp
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

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
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` char(20) NOT NULL,
  `account_name` char(30) NOT NULL,
  `dealer_code` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `ifsc_code` char(30) DEFAULT NULL,
  `swift_code` char(30) DEFAULT NULL,
  `aba_routing_no` char(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (10,'HDFC','hcbhdbhbhcd','cjdncdsnkjnckdsnkjcnjkds','33803935123','SBIN0005943','BOFAUS3N',NULL,'2021-04-26 14:27:03','2021-04-28 09:48:27'),(13,'ICICI','Parthiv','45','34627384934','SBIN0005943','CPPCUS31',NULL,'2021-04-29 06:52:25',NULL);
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` char(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `invoice_id` char(15) DEFAULT NULL,
  `p_o_number` int DEFAULT NULL,
  `terms` int DEFAULT NULL,
  `ship` date DEFAULT NULL,
  `bill_to` char(50) DEFAULT NULL,
  `ship_to` char(50) DEFAULT NULL,
  `via` char(50) DEFAULT NULL,
  `f_o_b` char(50) DEFAULT NULL,
  `rep` int DEFAULT NULL,
  `broker` char(50) DEFAULT NULL,
  `brokerage` int DEFAULT NULL,
  `pre_carriage_by` char(20) DEFAULT NULL,
  `flight_no` char(30) DEFAULT NULL,
  `final_dest` char(30) DEFAULT NULL,
  `port_of_loading` char(30) DEFAULT NULL,
  `country_of_goods` char(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (1,'vedot','2021-02-12','INV',123,1,'2021-03-12','buyer','central','mumbai','Gh',12,'cdf',21,'test','test','test','test','test','2021-04-20 09:13:14',NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_payments`
--

DROP TABLE IF EXISTS `bill_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` char(20) NOT NULL,
  `account_name` char(30) NOT NULL,
  `branch_id` int NOT NULL,
  `dealer_code` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `ifsc_code` char(30) NOT NULL,
  `swift_code` char(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_payments`
--

LOCK TABLES `bill_payments` WRITE;
/*!40000 ALTER TABLE `bill_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branch_id` char(50) DEFAULT NULL,
  `name` char(100) NOT NULL,
  `location` char(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'IN-1','branch_3','India','2021-03-22 06:44:02'),(2,'USA-2','branch_1','USA','2021-04-05 11:58:48'),(7,'USA-7','branch_2','Australia','2021-04-06 08:50:07'),(8,'USA-8','branch_4','Canada','2021-04-06 09:05:44');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chart_of_account`
--

DROP TABLE IF EXISTS `chart_of_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chart_of_account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `sub_name` char(30) NOT NULL,
  `type` char(30) NOT NULL,
  `balance` decimal(20,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chart_of_account`
--

LOCK TABLES `chart_of_account` WRITE;
/*!40000 ALTER TABLE `chart_of_account` DISABLE KEYS */;
INSERT INTO `chart_of_account` VALUES (1,'item-1','sub_name','inventory part',90,'2021-04-19 05:47:28','2021-05-13 04:58:40');
/*!40000 ALTER TABLE `chart_of_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `msg` longtext NOT NULL,
  `atch` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo` char(200) DEFAULT '/images/273849103849_logo.svg',
  `name` char(50) NOT NULL,
  `branch_name` char(50) NOT NULL,
  `email` char(45) NOT NULL,
  `phone_no` char(15) NOT NULL,
  `mobile_no` char(15) DEFAULT NULL,
  `website` text,
  `address` text NOT NULL,
  `tin_no` char(40) DEFAULT NULL,
  `pancard_no` char(12) DEFAULT NULL,
  `city` json DEFAULT NULL,
  `state` json DEFAULT NULL,
  `country` json NOT NULL,
  `gst_no` char(15) DEFAULT NULL,
  `ein_no` char(45) DEFAULT NULL,
  `tax_id` char(45) DEFAULT NULL,
  `attn_to` char(60) NOT NULL,
  `bank_id` char(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (8,'/images/914423906755_image_picker_88B2CE15-3530-4FA4-B868-0232A99549B5-2266-0000013701414425.jpg','Kukadia Ventures Pvt. Ltd.','KVPL Surat','info@kukadia.co','92839208799','9879051972',NULL,'A-301 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar,','987654poi','FRYPP1432P','{\"flag\": null, \"name\": \"Surat\", \"isoCode\": null, \"currency\": null, \"latitude\": \"21.17801000\", \"longitude\": \"72.81189000\", \"phonecode\": null, \"stateCode\": \"GJ\", \"timezones\": null, \"countryCode\": \"IN\"}','{\"flag\": null, \"name\": \"Gujarat\", \"isoCode\": \"GJ\", \"currency\": null, \"latitude\": \"22.25865200\", \"longitude\": \"71.19238050\", \"phonecode\": null, \"stateCode\": null, \"timezones\": null, \"countryCode\": \"IN\"}','{\"flag\": \"??\", \"name\": \"India\", \"isoCode\": \"IN\", \"currency\": \"INR\", \"latitude\": \"20.00000000\", \"longitude\": \"77.00000000\", \"phonecode\": \"91\", \"timezones\": [{\"tzName\": \"Indian Standard Time\", \"zoneName\": \"Asia/Kolkata\", \"gmtOffset\": 19800, \"abbreviation\": \"IST\", \"gmtOffsetName\": \"UTC+05:30\"}]}','24AAACC1206D1ZM',NULL,NULL,'kukadia','13,','2021-04-08 06:18:41','2021-04-28 10:30:45'),(11,'/images/273849103849_logo.svg','kukadia_erp','branch_2','support@kukadia.co','92839208799','378748738783','http://www.go','A-301 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar,','ncjdjcnjnjn','FRYPP1432P','{\"name\": \"Abrama\", \"latitude\": \"20.85865000\", \"longitude\": \"72.90648000\", \"stateCode\": \"GJ\", \"countryCode\": \"IN\"}','{\"name\": \"Andaman and Nicobar Islands\", \"isoCode\": \"AN\", \"latitude\": \"11.74008670\", \"longitude\": \"92.65864010\", \"countryCode\": \"IN\"}','{\"flag\": \"??\", \"name\": \"Afghanistan\", \"isoCode\": \"AF\", \"currency\": \"AFN\", \"latitude\": \"33.00000000\", \"longitude\": \"65.00000000\", \"phonecode\": \"93\", \"timezones\": [{\"tzName\": \"Afghanistan Time\", \"zoneName\": \"Asia/Kabul\", \"gmtOffset\": 16200, \"abbreviation\": \"AFT\", \"gmtOffsetName\": \"UTC+04:30\"}]}','24AAACC1206D1ZM',NULL,NULL,'kukadia','','2021-04-26 14:25:42','2021-04-28 12:12:15'),(12,'/images/273849103849_logo.svg','kukadia','branch_3','info@kukadia.co','92839208799','378748738783','http://www.go','A-301 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar,','ncjdjcnjnjn','FRYPP1432P','{\"name\": \"Abrama\", \"latitude\": \"20.85865000\", \"longitude\": \"72.90648000\", \"stateCode\": \"GJ\", \"countryCode\": \"IN\"}','{\"name\": \"Andaman and Nicobar Islands\", \"isoCode\": \"AN\", \"latitude\": \"11.74008670\", \"longitude\": \"92.65864010\", \"countryCode\": \"IN\"}','{\"flag\": \"??\", \"name\": \"Afghanistan\", \"isoCode\": \"AF\", \"currency\": \"AFN\", \"latitude\": \"33.00000000\", \"longitude\": \"65.00000000\", \"phonecode\": \"93\", \"timezones\": [{\"tzName\": \"Afghanistan Time\", \"zoneName\": \"Asia/Kabul\", \"gmtOffset\": 16200, \"abbreviation\": \"AFT\", \"gmtOffsetName\": \"UTC+04:30\"}]}','24AAACC1206D1ZM',NULL,NULL,'kukadia','10','2021-04-26 14:27:03','2021-04-28 10:30:46');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_memos`
--

DROP TABLE IF EXISTS `credit_memos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_memos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` char(20) NOT NULL,
  `account_name` char(30) NOT NULL,
  `branch_id` int NOT NULL,
  `dealer_code` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `ifsc_code` char(30) NOT NULL,
  `swift_code` char(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_memos`
--

LOCK TABLES `credit_memos` WRITE;
/*!40000 ALTER TABLE `credit_memos` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_memos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `email` char(40) NOT NULL,
  `phone_no` char(20) NOT NULL,
  `billing_address` text NOT NULL,
  `shipping_address` text NOT NULL,
  `website` text,
  `company_name` char(80) DEFAULT NULL,
  `notes` text,
  `sub_customer` tinyint DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Parth Patel','parth5097@gmail.com','91968409230','A-301 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar, Varachha, Surat-395006','A-301 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar, Varachha, Surat-395006',NULL,NULL,NULL,0,'2021-05-03 14:37:08','2021-05-04 11:53:54'),(2,'Parthiv Akbari','parthiv@rentechdigital.com','828934','A-331 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar, Surat-395005','A-331 Kamla Estate,Nr. Savani Estate, Kohinoor Road, Mini Bazaar, Surat-395004','','','',NULL,'2021-05-06 06:41:45','2021-05-06 11:16:47'),(5,'Rentech','parthivakbari98@gmail.com','9873645212','6, unuduj park, iij ksoc, kkskkdollfkmmkm, surat, gujarat','6, unuduj park, iij ksoc, kkskkdollfkmmkm, surat, gujarat','','','',NULL,'2021-05-07 10:07:12',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debit_memos`
--

DROP TABLE IF EXISTS `debit_memos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debit_memos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` char(20) NOT NULL,
  `account_name` char(30) NOT NULL,
  `branch_id` int NOT NULL,
  `dealer_code` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `ifsc_code` char(30) NOT NULL,
  `swift_code` char(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit_memos`
--

LOCK TABLES `debit_memos` WRITE;
/*!40000 ALTER TABLE `debit_memos` DISABLE KEYS */;
/*!40000 ALTER TABLE `debit_memos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fund_transfer`
--

DROP TABLE IF EXISTS `fund_transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fund_transfer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` char(30) NOT NULL,
  `t_f_from` char(50) NOT NULL,
  `t_f_to` char(50) NOT NULL,
  `date` date NOT NULL,
  `t_currency` char(50) NOT NULL,
  `t_amount` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fund_transfer`
--

LOCK TABLES `fund_transfer` WRITE;
/*!40000 ALTER TABLE `fund_transfer` DISABLE KEYS */;
INSERT INTO `fund_transfer` VALUES (1,'tst','fg','df','2020-04-12','100',100.00,'2021-04-21 08:52:46',NULL);
/*!40000 ALTER TABLE `fund_transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  `sub_name` char(30) NOT NULL,
  `description` text NOT NULL,
  `type` char(30) NOT NULL,
  `account` char(45) NOT NULL,
  `on_hand` decimal(20,0) NOT NULL,
  `stock_id` int NOT NULL,
  `sub_item_id` int DEFAULT NULL,
  `unit_of_m` int NOT NULL,
  `rate` decimal(20,2) NOT NULL,
  `avg_price` decimal(20,0) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'item-2','sub_name','This is the item','inventory part','sales discount',-15,0,0,0,0.00,90,'2021-04-21 08:22:37','2021-05-20 13:50:11');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `invoice_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `p_o_number` int DEFAULT NULL,
  `terms` int DEFAULT NULL,
  `ship` date DEFAULT NULL,
  `bill_to` char(50) DEFAULT NULL,
  `ship_to` char(50) DEFAULT NULL,
  `via` char(50) DEFAULT NULL,
  `f_o_b` char(50) DEFAULT NULL,
  `rap` int DEFAULT NULL,
  `broker` char(50) DEFAULT NULL,
  `brokerage` int DEFAULT NULL,
  `pre_carriage_by` char(20) DEFAULT NULL,
  `flight_no` char(30) DEFAULT NULL,
  `final_dest` char(30) DEFAULT NULL,
  `port_of_loading` char(30) DEFAULT NULL,
  `country_of_goods` char(30) DEFAULT NULL,
  `currency` char(30) DEFAULT 'USD',
  `amount` decimal(20,2) NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `status` char(45) DEFAULT 'notdue',
  `notes` text,
  `attachments` char(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Invoice_Branch` (`invoice_id`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (2,'2020-05-04',2,8,2,123,3,'2020-06-12','buyer','central','mumbai','Gh',12,'cdf',21,'test','test','test','test','test','USD',200.00,'2021-05-12 00:00:00','overdue',NULL,NULL,'2021-04-20 06:11:21','2021-05-13 00:00:01'),(4,'2021-03-12',1,11,1,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',400.00,'2021-04-12 07:50:23','overdue',NULL,NULL,'2021-04-27 07:50:23','2021-05-06 07:56:01'),(12,'2021-03-12',4,8,1,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 18:33:58','overdue',NULL,NULL,'2021-05-03 18:33:58','2021-05-19 00:00:01'),(22,'2021-03-12',5,8,2,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 18:46:12','overdue',NULL,NULL,'2021-05-03 18:46:12','2021-05-19 00:00:01'),(26,'2021-03-12',6,8,1,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 18:52:56','overdue',NULL,NULL,'2021-05-03 18:52:56','2021-05-19 00:00:01'),(28,'2021-03-12',2,11,2,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 18:53:23','overdue',NULL,NULL,'2021-05-03 18:53:23','2021-05-19 00:00:01'),(32,'2021-03-12',3,11,1,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 18:56:03','overdue',NULL,NULL,'2021-05-03 18:56:03','2021-05-19 00:00:01'),(36,'2021-03-12',4,11,2,123,1,'2021-04-12','buyer','central','mumbai','Gh',12,'cdf',21,NULL,NULL,NULL,NULL,NULL,'USD',200.00,'2021-05-18 19:07:18','overdue',NULL,NULL,'2021-05-03 19:07:18','2021-05-19 00:00:01'),(46,'2020-05-04',3,8,2,123,1,'2020-06-12','buyer','central','mumbai','Gh',12,'cdf',21,'test','test','test','test','test','USD',200.00,'2021-05-21 08:58:45','overdue',NULL,NULL,'2021-05-06 08:58:45','2021-05-22 00:00:01'),(54,'2020-05-04',7,8,2,123,1,'2020-06-12','buyer','central','mumbai','Gh',12,'cdf',21,'test','test','test','test','test','USD',200.00,'2021-05-21 09:02:15','overdue',NULL,NULL,'2021-05-06 09:02:15','2021-05-22 00:00:01'),(55,'2021-05-09',5,11,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'USD',800.00,'2021-05-24 18:02:32','overdue','This is great','/file/346335683366_Screenshot (7).png','2021-05-09 18:02:32','2021-05-25 00:00:01');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_product`
--

DROP TABLE IF EXISTS `invoice_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `name` char(45) NOT NULL,
  `invoice_id` int DEFAULT NULL,
  `description` text,
  `qty` int NOT NULL,
  `rate` int NOT NULL,
  `currency` char(20) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `sgst` decimal(20,2) DEFAULT '0.00',
  `cgst` decimal(20,2) DEFAULT '0.00',
  `igst` decimal(20,2) DEFAULT '0.00',
  `tax` decimal(20,2) DEFAULT '0.00',
  `total` decimal(20,2) DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_product`
--

LOCK TABLES `invoice_product` WRITE;
/*!40000 ALTER TABLE `invoice_product` DISABLE KEYS */;
INSERT INTO `invoice_product` VALUES (1,'2021-05-09','p-1',2,'gg hh  jj',10,20,'USD',200.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:15:58','2021-05-10 07:20:17'),(2,'2021-05-09','p-2',4,'kjnccdjkns nkncjdsjkcd',30,20,'USD',600.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:17:10','2021-05-09 18:23:47'),(3,'2021-05-09','p-6',12,'cdkjsnjn jncjdsnjcds',30,20,'USD',600.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:19:13','2021-05-09 18:23:48'),(4,'2021-05-09','p-7',22,'cdbscdnjsk jknkcdsnkcjd',20,10,'USD',200.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:19:48','2021-05-09 18:23:48'),(5,'2021-05-09','p-5',26,'jncdjnksjcdnjscd jkncdsjcs',30,20,'USD',400.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:35:47','2021-05-09 18:23:49'),(6,'2021-05-09','p-7',28,'ckjdsnncjkds',200,21,'USD',22000.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:40:59','2021-05-09 18:23:49'),(9,'2021-05-09','p-7',32,'cjdksn jkncdjksnc jkncksn knj',20,10,'USD',200.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:43:45','2021-05-09 18:23:49'),(10,'2021-05-09','p-8',48,'cjdj jn jn jn ',30,10,'USD',300.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:44:34','2021-05-09 18:23:50'),(11,'2021-05-09','p-7',2,'cjdn jnk njkn kj',30,20,'USD',600.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:45:56','2021-05-09 18:23:50'),(12,'2021-05-09','p-9',4,'cdjn jncjkdn jdkn jkcd',40,10,'USD',400.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:48:00','2021-05-09 18:23:51'),(14,'2021-05-09','p-9',12,'jcndjk njknkjn',90,20,'USD',900.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 11:49:33','2021-05-09 18:23:51'),(19,'2021-05-09','p-1',22,'cdsnncjk cdscd',10,20,'USD',200.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 17:55:17','2021-05-09 18:23:52'),(22,'2021-05-09','p-1',26,'cdjnj knjknjk ',10,20,'USD',200.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 18:00:17','2021-05-09 18:23:52'),(23,'2021-05-09','p-2',55,'uicdsncjkd',30,20,'USD',600.00,0.00,0.00,0.00,0.00,0.00,'2021-05-09 18:00:29','2021-05-09 18:02:32'),(29,'2021-05-10','p-1',8,'This is first trigger test',10,20,'INR',200.00,25.00,25.00,50.00,25.50,225.10,'2021-05-10 06:35:35',NULL);
/*!40000 ALTER TABLE `invoice_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rel_id` char(50) NOT NULL,
  `packet_number` char(50) DEFAULT NULL,
  `order_type` char(30) NOT NULL,
  `order_from` char(50) NOT NULL,
  `order_to` char(50) NOT NULL,
  `description` text NOT NULL,
  `stock` int NOT NULL,
  `currency` char(10) NOT NULL,
  `price` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (22,'P-870','P-870','purchase','XYZ','branch_3','purchase order from XYZ to branch-3 of 100 for price of 25000',100,'INR',25000,'2021-04-05 11:10:54','2021-04-06 05:53:00'),(23,'S-398','P-870','sale','branch_3','XYZ','sale order from branch-3 to XYZ of 100 for price of 25000',100,'INR',25000,'2021-04-05 11:12:12','2021-04-06 05:53:00'),(24,'BT-731','P-870','branch transfer','branch_3','branch_1','Branch Transfer order from branch-3 to branch-1 of 100 for price of 25000',100,'INR',25000,'2021-04-05 11:13:29','2021-04-06 05:53:01');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_account`
--

DROP TABLE IF EXISTS `loan_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emi_amount` decimal(20,2) NOT NULL,
  `currency` char(45) NOT NULL DEFAULT 'USD',
  `start_balance` decimal(20,2) NOT NULL,
  `payment_amount` decimal(20,2) NOT NULL,
  `principal` decimal(20,2) NOT NULL,
  `interest` decimal(20,2) NOT NULL,
  `end_balance` decimal(20,2) NOT NULL,
  `loan_code` char(50) NOT NULL,
  `bank` char(50) NOT NULL,
  `borrowers` text NOT NULL,
  `gaurenters` text NOT NULL,
  `property_detail` text NOT NULL,
  `tenure` int NOT NULL,
  `processing_changes` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_account`
--

LOCK TABLES `loan_account` WRITE;
/*!40000 ALTER TABLE `loan_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `msg` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,1,'User added','2021-03-22 10:21:19'),(2,1,'User added','2021-03-22 10:53:55'),(3,1,'User added','2021-03-22 10:54:22'),(4,1,'User added','2021-03-22 10:55:06'),(5,1,'User added','2021-04-01 07:53:09'),(6,3,'User added','2021-04-05 06:07:30'),(7,3,'User added','2021-04-05 06:17:15'),(8,3,'User added','2021-04-12 06:30:30'),(9,3,'User added','2021-04-12 06:32:42'),(10,1,'User added','2021-04-12 06:38:57'),(11,1,'User added','2021-05-17 20:46:56'),(12,1,'User added','2021-05-19 12:57:24'),(13,1,'User added','2021-05-19 12:58:08'),(14,1,'User added','2021-05-19 13:04:57');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order`
--

DROP TABLE IF EXISTS `purchase_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` char(20) NOT NULL,
  `date` date NOT NULL,
  `vendor` longtext NOT NULL,
  `p_o_number` char(30) NOT NULL,
  `ship_to` text NOT NULL,
  `ifsc_code` char(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order`
--

LOCK TABLES `purchase_order` WRITE;
/*!40000 ALTER TABLE `purchase_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `received_payments`
--

DROP TABLE IF EXISTS `received_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `received_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bank_name` char(20) NOT NULL,
  `account_name` char(30) NOT NULL,
  `branch_id` int NOT NULL,
  `dealer_code` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `ifsc_code` char(30) NOT NULL,
  `swift_code` char(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `received_payments`
--

LOCK TABLES `received_payments` WRITE;
/*!40000 ALTER TABLE `received_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `received_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_order`
--

DROP TABLE IF EXISTS `sales_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` char(20) NOT NULL,
  `date` date NOT NULL,
  `address` text NOT NULL,
  `s_o_number` char(30) NOT NULL,
  `rap` char(20) NOT NULL,
  `ship_tp` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_order`
--

LOCK TABLES `sales_order` WRITE;
/*!40000 ALTER TABLE `sales_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ship`
--

DROP TABLE IF EXISTS `ship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `shipping_detail` text NOT NULL,
  `item_id` int NOT NULL,
  `currency` char(45) DEFAULT 'USD',
  `total` double(20,2) NOT NULL,
  `status` char(45) NOT NULL DEFAULT 'hold',
  `invoice_type` char(45) NOT NULL,
  `sub_total` decimal(20,2) NOT NULL,
  `tax_rate` decimal(20,2) NOT NULL,
  `shipping_partner` char(100) NOT NULL,
  `shipping_address` text NOT NULL,
  `date` date NOT NULL,
  `tracking_number` int NOT NULL,
  `approx_delivery_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ship`
--

LOCK TABLES `ship` WRITE;
/*!40000 ALTER TABLE `ship` DISABLE KEYS */;
/*!40000 ALTER TABLE `ship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms`
--

DROP TABLE IF EXISTS `terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `terms` char(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms`
--

LOCK TABLES `terms` WRITE;
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `track` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shipment_date` date NOT NULL,
  `customer_id` int NOT NULL,
  `ship_id` int NOT NULL,
  `currency` char(30) DEFAULT 'USD',
  `total_carats` double(20,2) NOT NULL,
  `total_value` double(20,2) NOT NULL,
  `total` double(20,2) NOT NULL,
  `status` char(45) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track`
--

LOCK TABLES `track` WRITE;
/*!40000 ALTER TABLE `track` DISABLE KEYS */;
INSERT INTO `track` VALUES (1,'2020-04-12',1,1,'USD',20.50,200.00,200.02,'pending','2021-05-19 10:17:44',NULL),(2,'2021-05-02',1,2,'USD',200.50,203.00,202.02,'pending','2021-05-19 10:24:29',NULL);
/*!40000 ALTER TABLE `track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payee` char(30) NOT NULL,
  `account` char(50) NOT NULL,
  `memo` char(30) NOT NULL,
  `deposite` decimal(20,2) NOT NULL,
  `payment` decimal(20,2) NOT NULL,
  `balance` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (3,'John','Office Expenses:Food & Entertainment','tea',2000.00,10000.00,498729.00,'2021-04-09 09:45:18',NULL),(4,'John','Office Expenses:Food & Entertainment','tea',2000.00,10000.00,508729.00,'2021-04-09 09:51:18',NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_payments`
--

DROP TABLE IF EXISTS `transaction_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_payments` (
  `order_id` char(100) NOT NULL,
  `payment_id` char(100) NOT NULL,
  `payment_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_verification` char(50) NOT NULL,
  `payment_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `payment_id` (`payment_id`),
  UNIQUE KEY `order_id` (`order_id`),
  CONSTRAINT `transactional_payments_chk_1` CHECK (json_valid(`payment_object`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_payments`
--

LOCK TABLES `transaction_payments` WRITE;
/*!40000 ALTER TABLE `transaction_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_token`
--

DROP TABLE IF EXISTS `transaction_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `desktop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `mac` text,
  `mobile` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_token`
--

LOCK TABLES `transaction_token` WRITE;
/*!40000 ALTER TABLE `transaction_token` DISABLE KEYS */;
INSERT INTO `transaction_token` VALUES (2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOjEsImlhdCI6MTYyMjEwNTA5OX0.dWUdhpFHR8G8wfSogHmCyMU9x2thPh8aOBYu4tkGzf8,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOjEsImlhdCI6MTYyMjEwOTY0NX0.LtuxdKOuGNXPH__FaxpQytiL7h-HtaeccQ7E4q6IQFE',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJhY2NfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjE5MDk1MDI5fQ.gks7MXY25DH9qp40WMLRFw1km3onvWgsBqCQqMf1INk','2021-05-27 10:00:45'),(12,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiaWF0IjoxNjE3NjAzMzM0fQ.7OvcZtKi9XzihVrNDVPn8nqsU_LHS1RBSeIf2_3AU6U',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJpYXQiOjE2MTY1ODk0NjZ9.bYaejFKr1ljUxkkDbym7-Xdlm7ug2MP8fdrzXybKW9k','2021-04-05 06:15:34'),(25,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJzdXBlciBhZG1pbiIsImlhdCI6MTYyMDcyNTcyM30.SqHiqeQAwsuh8SKVZcTJK0XqN3isiujrmgdTJPL03RQ,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJBZG1pbiIsImlhdCI6MTYyMTIzMjYxMn0.Dx7J0UkSvHYdBMVkSkUYTXL1LDTprxZcwRyMAjQmXII',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJhY2NfdHlwZSI6InN1cGVyIGFkbWluIiwiaWF0IjoxNjIxMjQxMTM4fQ.AUG9IT0koiu9h53n25aM36SllTerKq-N8x--H14LAU4','2021-05-17 08:45:38'),(69,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJVc2VyIiwiaWF0IjoxNjE4NTQ2MjAzfQ.bl4EEcwzPRGZ53win5HyDXLDavxLw_C6llhjl1TipT0,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJVc2VyIiwiaWF0IjoxNjE5MDc1ODQzfQ.eya9UXEZPbt9WYIfk_Il-B7zEBiwJ_AFCGsRmwC1jjk',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJhY2NfdHlwZSI6ImFkbWluIiwiaWF0IjoxNjE5MDk3MDIzfQ.UC_P_92tZ0kFs6YgiCoe5sZR115ZyEjMLxFBeTq52WY','2021-04-22 13:10:23'),(73,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiaWF0IjoxNjE3NjAwMzA4fQ.WRqkGaC9pZdyEnqQ3w8ovmQR4SSeR4tzS5AI9xsU3ug',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJpYXQiOjE2MTc2ODk3OTl9.JcVAGjBT2vO7Q-w-XQLfB4f2k80_QATi7foHxBaSJTA','2021-04-06 06:16:39'),(169,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoiYWRtaW4iLCJpYXQiOjE2MTg0NjEyMTV9.7daH99QBpKRcgyFrlwCgCyLlmyHNRMBGe7q4glhtaxI,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoiVXNlciIsImlhdCI6MTYxODQ3OTU2MX0.Gwh_r12HVGM0XHKlVzIRuU2SCdNg_iTckl-19yd0gSA',NULL,NULL,'2021-04-15 09:39:21'),(196,7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJVc2VyIiwiaWF0IjoxNjIwNjIxMTU0fQ.nZIfzUHAxO90zCSOp2fE41dBFRMDJQw1EDMJ1Aq_NGI,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZGV2aWNlX3R5cGUiOiJkZXNrdG9wIiwiYWNjX3R5cGUiOiJVc2VyIiwiaWF0IjoxNjIxMjMxNDE0fQ.nva_obmpiCo5KA_eC9w5XPZsoLmXIimbvZpN5pKiw3k',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZGV2aWNlX3R5cGUiOiJtb2JpbGUiLCJhY2NfdHlwZSI6InNlbGYgcmVwcmVzZW50ZXRpdmUiLCJpYXQiOjE2MjEyMzE1NzV9.PXxAWWBy4Jfia655Facm8LvdOaX-T4-6HNUB4SVY_KY','2021-05-17 06:06:15'),(363,12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoxLCJpYXQiOjE2MjIxMDA2MzB9.9UT6jDRKbYB-zXnwnJXMQ0GiTGkRPWbq4IKfcapeXqs,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoxLCJpYXQiOjE2MjIxMDkyMTZ9.5uMynDRRUbbq2J5jWBDOlnw7Ipu9nYST7k7uQt_DV2w',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImRldmljZV90eXBlIjoibW9iaWxlIiwiYWNjX3R5cGUiOiIxIiwiaWF0IjoxNjIxODUyNTkxfQ.M4pUfNDuXhAD9uohSWVHi3o6C6NHtUwzu1mT7iC0m48','2021-05-27 09:53:36'),(366,13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoiU3VwZXIgQWRtaW4iLCJpYXQiOjE2MjE1NzYyOTZ9.QC1p1SCrMuRUSWz5F2hEFRnkzGjbShU-jliV4EUgFdE,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoxLCJpYXQiOjE2MjE2MDIzNDV9.cpScp1eOSzhhdLfGiRLbTSr9PO54bOpYzYyoGelZIzA',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImRldmljZV90eXBlIjoibW9iaWxlIiwiYWNjX3R5cGUiOiIyIiwiaWF0IjoxNjIxOTM4Nzg1fQ.wrANnUdecrpL1yp0ppw9ajANY0Ktn2MxkCGxHfHQ-6Y','2021-05-25 10:33:05'),(369,14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoxLCJpYXQiOjE2MjE2MDIzODR9.hEj6tIbuNstNXpBEb1IdfpWOn0T_1HsSDqGxwI2RiMU,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImRldmljZV90eXBlIjoiZGVza3RvcCIsImFjY190eXBlIjoxLCJpYXQiOjE2MjIwOTAxMTB9.9ldhJsO-DdqJyO4gyNOGWyg-Z5CL0d3V5KwdGn0Ns1I',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImRldmljZV90eXBlIjoibW9iaWxlIiwiYWNjX3R5cGUiOiIzIiwiaWF0IjoxNjIxOTM0OTk1fQ.jxqBfdxuiDnUedrJJHda9GyI8PQrZs6VfytsAwl9VEA','2021-05-27 04:35:10');
/*!40000 ALTER TABLE `transaction_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isOnline` tinyint NOT NULL DEFAULT '0',
  `avatar` char(200) DEFAULT NULL,
  `login_status` tinyint(1) DEFAULT '0',
  `first_name` char(50) NOT NULL,
  `last_name` char(50) NOT NULL,
  `email` char(50) NOT NULL,
  `password` char(150) DEFAULT NULL,
  `mobile_no` char(15) NOT NULL,
  `acc_type` int NOT NULL DEFAULT '1',
  `device_type` char(30) NOT NULL DEFAULT '',
  `fcm_token` char(200) DEFAULT NULL,
  `branch_access` char(100) DEFAULT NULL,
  `socket_id` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',1,'parth','Patel','parth5097@gmail.com','$2b$10$rx3/cqAPUpxi2wIGLdrjC.tdQcfe/Up9RNLSkenogRMSSlxSd9eXC','9625315214',2,'desktop mobile','undefined','11',NULL,'2021-03-31 12:26:10','2021-05-21 11:06:27'),(10,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',1,'PP','GG','parthivakbari98@gmail.com','$2b$10$NJq2RdlOWfbclF1arhMuiOCldaL3kCemMFxwXUgRc1pSNIOvwltDO','1782737823',1,'desktop','undefined','8',NULL,'2021-04-12 06:38:57','2021-05-21 11:06:28'),(11,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',0,'SHYAM','KUKADIA','shyam@kukadia.co','$2b$10$EtZhcC6SZ7ncxzhdEXEa0eMSLI5/Gxc2zXuMsMjyXxXrGiaJ1egzO','9081888555',2,'',NULL,'INDIA',NULL,'2021-05-17 20:46:56','2021-05-21 11:06:28'),(12,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',1,'Admin','test','admin@gmail.com','$2b$10$MLBj8C9rPWe8XX62xtyKWuSF2faBuJGfdaIdag8CSWzzZamw9IU6u','9189273458',1,'desktop','undefined','Nweyork',NULL,'2021-05-19 12:57:24','2021-05-27 05:17:53'),(13,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',1,'Super Admin','Test','suparadmin@gmail.com','$2b$10$t5.irWjbrH/3s.fDsI.htuGcu4ic5mOPHOgJy60OXZ7FOIA3BkHLK','8798765633',2,'desktop mobile','cRqpI95wTkF6g7sleoVTWQ:APA91bFSh5aGcMKTVLWzkDjEPoDHA5oTUn1ESzLdaV6cUor1DEM2VzHdh99WacSru_kx-ff3UPjfH9t9dqPEeHt6532w3k_TGOZUAqC4xt4gXHWk4NX_hODbE8_EEk6jV7FGkKGsq1GT','India',NULL,'2021-05-19 12:58:08','2021-05-25 10:33:05'),(14,0,'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Googleplex_HQ_%28cropped%29.jpg/1280px-Googleplex_HQ_%28cropped%29.jpg',1,'Sales Representative','test','salesrepresentative@gmail.com','$2b$10$c2QasjzPivJZzrtG0Mw9guF2SNnqEzt3AYSETr/9D9fS/TNGXaYDO','7862534123',3,'desktop','undefined','Newyork',NULL,'2021-05-19 13:04:57','2021-05-27 04:35:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` char(30) NOT NULL,
  `number` char(30) NOT NULL,
  `date` date NOT NULL,
  `account` char(30) NOT NULL,
  `account_no` char(20) NOT NULL,
  `amount` decimal(20,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-27 15:57:12
