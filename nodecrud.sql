-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 28, 2020 at 09:49 PM
-- Server version: 5.7.26
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodecrud`
--

-- --------------------------------------------------------

--
-- Table structure for table `ecommerce`
--

DROP TABLE IF EXISTS `ecommerce`;
CREATE TABLE IF NOT EXISTS `ecommerce` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `strName` varchar(255) NOT NULL,
  `strImage` varchar(255) NOT NULL,
  `nPrice` decimal(10,2) NOT NULL,
  `strDescription` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ecommerce`
--

INSERT INTO `ecommerce` (`id`, `strName`, `strImage`, `nPrice`, `strDescription`) VALUES
(1, 'Nite Jogger Shoes', 'nite_jogger.jpg', '159.99', 'Lorem ipsum dolor sit amet '),
(2, 'Continental 80 shoes', 'adidas-Continental-80.jpg', '89.99', 'Lorem ipsum dolor sit amet'),
(3, 'Ozweego Shoes', 'adidas-ozweego-on-feet-3-1-683x1024.jpg', '150.00', 'Designed by Adidas in 1999, over the years it has become a must have in the wardrobe. ');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
