-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2020 at 02:34 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weekly-task`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `project_name` varchar(25) NOT NULL,
  `project_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `user_id`, `project_name`, `project_description`) VALUES
(54, 54, 'PIC-ID', 'Description of PIC-ID'),
(55, 54, 'KFG', 'Description'),
(56, 54, 'Weekly Tasks', 'Description of Weekly Tasks'),
(77, 52, 'KFG', ''),
(78, 52, 'PIC-ID', ''),
(79, 52, 'PROJECT 1', ''),
(80, 52, 'PROJECT 2', ''),
(81, 52, 'PROJECT 3', ''),
(82, 52, 'PROJECT 4', ''),
(83, 52, 'PROJECT 6', ''),
(84, 52, 'PROJECT 7', '');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `education` varchar(100) NOT NULL,
  `job_position` varchar(100) NOT NULL,
  `language` varchar(100) NOT NULL,
  `file_gambar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `email`, `password`, `first_name`, `last_name`, `education`, `job_position`, `language`, `file_gambar`) VALUES
(52, 'ni.alfianinda@gmail.com', '$2b$10$vVxdmi9eXhQJT//Q0xMC..EwylQQ0rgMvMATGhDX4dWqfXuCfCx3m', 'Nur Inna', 'Alfianinda', 'Geothermal Exploration', 'Front-End Developer', 'Javascript', 'gettyimages-485360238.jpg'),
(54, 'ni.alfianinda@outlook.com', '$2b$10$MCvraQ5Tlnb9KWk0/.nTcu9jnYH7T5Ij/gMfrWkAsNVv7Ir1oC5qi', 'Nur Inna', 'Alfianinda', 'Geothermal Exploration', 'Front-End Developer', 'Javascript', 'logo.png');

-- --------------------------------------------------------

--
-- Table structure for table `time_sheet`
--

CREATE TABLE `time_sheet` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hours` int(2) NOT NULL,
  `day` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `time_sheet`
--

INSERT INTO `time_sheet` (`id`, `project_id`, `user_id`, `hours`, `day`, `note`) VALUES
(113, 54, 54, 2, '2020-04-08 16:00:00', ''),
(114, 55, 54, 2, '2020-04-08 16:00:00', ''),
(115, 56, 54, 2, '2020-04-14 16:00:00', ''),
(142, 77, 52, 3, '2020-04-07 09:46:19', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_sheet`
--
ALTER TABLE `time_sheet`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `time_sheet`
--
ALTER TABLE `time_sheet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
