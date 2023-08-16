-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-08-2023 a las 06:27:37
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `casasredsubscribers`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(1024) NOT NULL,
  `appname` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(1024) DEFAULT '/assets/img/nofoto.png',
  `type` varchar(64) NOT NULL DEFAULT 'gratis',
  `status` varchar(64) NOT NULL DEFAULT 'creada',
  `created_by` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int NOT NULL,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`id`, `email`, `name`, `appname`, `description`, `slug`, `image`, `type`, `status`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 'ventas@casasred.com', 'CASASRED Promotora de Vivienda', 'CasasRed Suscriptores', 'Sistema para el Control de Suscriptores de CasasRed.com', 'super', '/assets/uploads/2023-08/staff/1_1691821431.png', 'premium', 'activo', 1, '2023-10-15 17:09:32', 1, '2023-08-11 23:26:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
CREATE TABLE IF NOT EXISTS `refresh_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountid` int NOT NULL,
  `hash` varchar(128) NOT NULL,
  `expires_at` varchar(34) NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `refresh_token`
--

INSERT INTO `refresh_token` (`id`, `accountid`, `hash`, `expires_at`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(132, 1, 'fe0ff79791da1d45c47187e7e479a2880ac71af79a7cb124e118e09979de33f3', '1692251479', 1, '2023-08-11 22:51:19', 1, '2023-08-11 22:51:19'),
(133, 1, 'e0c73fb6e0aaa38447306b39a0f6f0dcae6bc4ec53f79d5799d4db7688ee8b6a', '1692252006', 1, '2023-08-11 23:00:06', 1, '2023-08-11 23:00:06'),
(135, 1, 'ef40f08e39482ab9554ff4e39b5c019a1f31ca2c546bcfe63231bb38be5d6a1f', '1692253363', 1, '2023-08-11 23:22:44', 1, '2023-08-11 23:22:44'),
(137, 1, '458e38f14c70dba2bd2e1f2a0af9716df81c347d26426de4f07d3b2bcffe0a45', '1692253474', 1, '2023-08-11 23:24:34', 1, '2023-08-11 23:24:34'),
(141, 1, '1a335d612d40a49b9ec43a8f93c48386d124248b0eb7d85f7161783a8e8fc4d5', '1692253622', 1, '2023-08-11 23:27:02', 1, '2023-08-11 23:27:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountid` int NOT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `api_key` varchar(32) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `role` varchar(1024) NOT NULL DEFAULT 'operador',
  `lastlogin` datetime DEFAULT NULL,
  `image` varchar(1024) DEFAULT '/assets/img/nofoto.png',
  `status` varchar(64) DEFAULT 'activo',
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `staff`
--

INSERT INTO `staff` (`id`, `accountid`, `name`, `api_key`, `email`, `password`, `role`, `lastlogin`, `image`, `status`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(1, 1, 'CASASRED Super', 'D4C3B2A1', 'super@casasred.com', '$2y$10$VbvYeYf/XlI0rqQGbGAHfeSp6UWGyBqMrbCERqU1ZEHznpOHYQpru', 'super', '2023-08-12 06:24:52', '/assets/uploads/2023-08/staff/1_1691821431.png', 'activo', 1, '2023-10-15 17:52:33', 1, '2023-08-11 23:24:52'),
(2, 1, 'CASASRED Admin', 'A1B2C3D4', 'admin@casasred.com', '$2y$10$VbvYeYf/XlI0rqQGbGAHfeSp6UWGyBqMrbCERqU1ZEHznpOHYQpru', 'admin', '2023-02-10 09:16:52', '/assets/uploads/2023-08/staff/2_1691821426.png', 'activo', 1, '2023-10-15 17:52:33', 1, '2023-08-11 23:23:46'),
(3, 1, 'CASASRED Soporte', 'E5F6G7H8', 'soporte@casasred.com', '$2y$10$VbvYeYf/XlI0rqQGbGAHfeSp6UWGyBqMrbCERqU1ZEHznpOHYQpru', 'recepcion', '2023-10-15 17:52:33', '/assets/uploads/2023-08/staff/3_1691821417.png', 'activo', 1, '2023-10-15 17:52:33', 1, '2023-08-11 23:23:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountid` int NOT NULL,
  `sellfulladdress` varchar(1024) DEFAULT '',
  `buyfulladdress` varchar(1024) DEFAULT '',
  `timeline` varchar(1024) DEFAULT '',
  `motivations` varchar(1024) DEFAULT '',
  `pricerange` varchar(1024) DEFAULT '',
  `downpayment` varchar(1024) DEFAULT '',
  `ownahome` varchar(1024) DEFAULT '',
  `buyahome` varchar(1024) DEFAULT '',
  `mortgage` varchar(1024) DEFAULT '',
  `typeofhome` varchar(1024) DEFAULT '',
  `features` varchar(1024) DEFAULT '',
  `lookingtomove` varchar(1024) DEFAULT '',
  `email` varchar(1024) DEFAULT '',
  `phonenumber` varchar(1024) DEFAULT '',
  `firstname` varchar(1024) DEFAULT '',
  `lastname` varchar(1024) DEFAULT '',
  `service` varchar(1024) DEFAULT '',
  `status` varchar(64) NOT NULL DEFAULT 'activo',
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `subscribers`
--

INSERT INTO `subscribers` (`id`, `accountid`, `sellfulladdress`, `buyfulladdress`, `timeline`, `motivations`, `pricerange`, `downpayment`, `ownahome`, `buyahome`, `mortgage`, `typeofhome`, `features`, `lookingtomove`, `email`, `phonenumber`, `firstname`, `lastname`, `service`, `status`, `created_by`, `created_at`, `modified_by`, `modified_at`) VALUES
(16, 1, 'okas', 'lokas', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'activo', NULL, '2023-08-11 22:49:32', NULL, '2023-08-11 22:49:32'),
(17, 1, 'okas', 'lokas', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'activo', 1, '2023-08-11 22:49:55', 1, '2023-08-11 22:49:55'),
(18, 1, 'okas', 'lokas', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'activo', 1, '2023-08-11 22:50:01', 1, '2023-08-11 22:50:01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
