-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2023 at 06:00 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slagalica`
--

-- --------------------------------------------------------

--
-- Table structure for table `igra`
--

CREATE TABLE `igra` (
  `igraID` int(30) NOT NULL,
  `imeIgre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `igra`
--

INSERT INTO `igra` (`igraID`, `imeIgre`) VALUES
(1, 'slagalica'),
(2, 'mojbroj'),
(3, 'skocko'),
(4, 'koznazna'),
(5, 'spojnice'),
(6, 'asocijacije');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `korisnikID` int(30) NOT NULL,
  `mejl` varchar(30) NOT NULL,
  `ime` varchar(30) NOT NULL,
  `sifra` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`korisnikID`, `mejl`, `ime`, `sifra`) VALUES
(1, 'admin', 'admin', 'admin'),
(2, 'marko@gmail.com', 'Marko', 'marko'),
(3, 'amela@gmail.com', 'amela', '123'),
(4, 'stevan@gmail.com', 'Stevan', 'stevan'),
(5, 'vanja@gmail.com', 'vanjy', 'krompirici'),
(6, 'ddjosic@gmail.com', 'dejan', '123');

-- --------------------------------------------------------

--
-- Table structure for table `partija`
--

CREATE TABLE `partija` (
  `partijaID` int(30) NOT NULL,
  `ukupnoPoena` int(30) NOT NULL,
  `korisnikID` int(30) NOT NULL,
  `datum` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `partija`
--

INSERT INTO `partija` (`partijaID`, `ukupnoPoena`, `korisnikID`, `datum`) VALUES
(0, 0, 1, '2023-01-21 14:39:59'),
(1, 30, 1, '2023-01-26 23:11:32'),
(2, 72, 1, '2023-02-01 13:09:44'),
(3, 124, 1, '2023-02-11 14:09:09'),
(4, 139, 1, '2023-02-21 14:49:51'),
(5, 142, 2, '2023-02-23 15:15:51'),
(6, 0, 1, '2023-02-27 17:27:57'),
(7, 0, 2, '2023-03-01 20:35:18'),
(8, 0, 2, '2023-03-06 21:57:48'),
(9, 0, 2, '2023-03-07 14:17:28'),
(10, 0, 1, '2023-03-09 12:19:33'),
(11, 20, 1, '2023-03-22 16:19:21'),
(12, 151, 4, '2023-03-29 10:29:13'),
(13, 45, 4, '2023-04-02 19:21:40'),
(14, 50, 4, '2023-04-13 11:05:14'),
(15, 104, 3, '2023-04-16 13:02:55'),
(16, 110, 5, '2023-05-03 22:34:14'),
(17, 123, 6, '2023-05-05 14:18:51');

-- --------------------------------------------------------

--
-- Table structure for table `runda`
--

CREATE TABLE `runda` (
  `rundaID` int(30) NOT NULL,
  `korisnikID` int(30) NOT NULL,
  `igraID` int(30) NOT NULL,
  `poeni` int(30) NOT NULL,
  `partijaID` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `runda`
--

INSERT INTO `runda` (`rundaID`, `korisnikID`, `igraID`, `poeni`, `partijaID`) VALUES
(1, 1, 2, 0, 1),
(2, 1, 3, 30, 1),
(3, 1, 4, 0, 1),
(4, 1, 5, 0, 1),
(5, 1, 6, 0, 1),
(145, 1, 1, 0, 1),
(146, 1, 1, 8, 2),
(147, 1, 2, 30, 2),
(148, 1, 3, 10, 2),
(149, 1, 4, 0, 2),
(150, 1, 5, 24, 2),
(151, 1, 6, 0, 2),
(152, 1, 1, 10, 3),
(153, 1, 2, 30, 3),
(154, 1, 3, 30, 3),
(155, 1, 4, 0, 3),
(156, 1, 5, 24, 3),
(157, 1, 6, 30, 3),
(158, 1, 1, 12, 4),
(159, 1, 2, 15, 4),
(160, 1, 3, 20, 4),
(161, 1, 4, 50, 4),
(162, 1, 5, 12, 4),
(163, 1, 6, 30, 4),
(164, 2, 1, 8, 5),
(165, 2, 2, 30, 5),
(166, 2, 3, 10, 5),
(167, 2, 4, 43, 5),
(168, 2, 5, 21, 5),
(169, 2, 6, 30, 5),
(170, 1, 1, 0, 6),
(171, 1, 2, 0, 6),
(172, 1, 3, 0, 6),
(173, 1, 4, 0, 6),
(174, 1, 5, 0, 6),
(175, 1, 6, 0, 6),
(176, 2, 1, 0, 7),
(177, 2, 2, 0, 7),
(178, 2, 3, 0, 7),
(179, 2, 4, 0, 7),
(180, 2, 5, 0, 7),
(181, 2, 6, 0, 7),
(182, 2, 1, 0, 8),
(183, 2, 2, 0, 8),
(184, 2, 3, 0, 8),
(185, 2, 4, 0, 8),
(186, 2, 5, 0, 8),
(187, 2, 6, 0, 8),
(188, 2, 1, 0, 9),
(189, 2, 2, 0, 9),
(190, 2, 3, 0, 9),
(191, 2, 4, 0, 9),
(192, 2, 5, 0, 9),
(193, 2, 6, 0, 9),
(194, 1, 1, 0, 10),
(195, 1, 2, 0, 10),
(196, 1, 3, 0, 10),
(197, 1, 4, 0, 10),
(198, 1, 5, 0, 10),
(199, 1, 6, 0, 10),
(200, 1, 1, 0, 11),
(201, 1, 2, 0, 11),
(202, 1, 3, 20, 11),
(203, 1, 4, 0, 11),
(204, 1, 5, 0, 11),
(205, 1, 6, 0, 11),
(206, 4, 1, 12, 12),
(207, 4, 2, 25, 12),
(208, 4, 3, 60, 12),
(209, 4, 4, 0, 12),
(210, 4, 5, 24, 12),
(211, 4, 6, 30, 12),
(212, 4, 1, 20, 13),
(213, 4, 2, 25, 13),
(214, 4, 3, 0, 13),
(215, 4, 4, 0, 13),
(216, 4, 5, 0, 13),
(217, 4, 6, 0, 13),
(218, 4, 1, 6, 14),
(219, 4, 2, 0, 14),
(220, 4, 3, 0, 14),
(221, 4, 4, 14, 14),
(222, 4, 5, 0, 14),
(223, 4, 6, 30, 14),
(224, 3, 1, 6, 15),
(225, 3, 2, 30, 15),
(226, 3, 3, 20, 15),
(227, 3, 4, 0, 15),
(228, 3, 5, 18, 15),
(229, 3, 6, 30, 15),
(230, 5, 1, 10, 16),
(231, 5, 2, 25, 16),
(232, 5, 3, 0, 16),
(233, 5, 4, 24, 16),
(234, 5, 5, 21, 16),
(235, 5, 6, 30, 16),
(236, 6, 1, 20, 17),
(237, 6, 2, 25, 17),
(238, 6, 3, 30, 17),
(239, 6, 4, 0, 17),
(240, 6, 5, 18, 17),
(241, 6, 6, 30, 17);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `igra`
--
ALTER TABLE `igra`
  ADD PRIMARY KEY (`igraID`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`korisnikID`);

--
-- Indexes for table `partija`
--
ALTER TABLE `partija`
  ADD PRIMARY KEY (`partijaID`),
  ADD KEY `korisnikID` (`korisnikID`);

--
-- Indexes for table `runda`
--
ALTER TABLE `runda`
  ADD PRIMARY KEY (`rundaID`),
  ADD KEY `korisnikID` (`korisnikID`),
  ADD KEY `igraID` (`igraID`),
  ADD KEY `partijaID` (`partijaID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `runda`
--
ALTER TABLE `runda`
  MODIFY `rundaID` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `partija`
--
ALTER TABLE `partija`
  ADD CONSTRAINT `partija_ibfk_1` FOREIGN KEY (`korisnikID`) REFERENCES `korisnik` (`korisnikID`);

--
-- Constraints for table `runda`
--
ALTER TABLE `runda`
  ADD CONSTRAINT `igraID` FOREIGN KEY (`igraID`) REFERENCES `igra` (`igraID`),
  ADD CONSTRAINT `korisnikID` FOREIGN KEY (`korisnikID`) REFERENCES `korisnik` (`korisnikID`),
  ADD CONSTRAINT `partijaID` FOREIGN KEY (`partijaID`) REFERENCES `partija` (`partijaID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
