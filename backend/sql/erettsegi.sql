-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: May 07, 2022 at 05:36 PM
-- Server version: 10.6.4-MariaDB-1:10.6.4+maria~focal
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erettsegi`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Kombinatorika'),
(2, 'Valószínűségszámítás'),
(3, 'Sorozatok'),
(4, 'Síkgeometria'),
(5, 'Számok és műveletek, számelmélet'),
(6, 'Függvények'),
(7, 'Térgeometria'),
(8, 'Statisztika'),
(9, 'Exponenciális és logaritmusos feladatok'),
(11, 'Koordinátageometria'),
(12, 'Logika'),
(13, 'Halmazok'),
(14, 'Trigonometria');

-- --------------------------------------------------------

--
-- Table structure for table `periods`
--

CREATE TABLE `periods` (
  `id` int(11) NOT NULL,
  `periodName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `periods`
--

INSERT INTO `periods` (`id`, `periodName`) VALUES
(3, '2021 Október'),
(4, '2021 Május'),
(5, '2021 Május – Idegennyelvű'),
(6, '2020. október'),
(7, '2020. május');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task_image_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `task_no` int(11) NOT NULL,
  `task_point_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task_image_id`, `category_id`, `period_id`, `task_no`, `task_point_no`) VALUES
(4, 34, 13, 3, 2, 1),
(5, 35, 1, 3, 2, 2),
(6, 36, 4, 3, 3, 3),
(7, 37, 5, 3, 4, 3),
(8, 38, 6, 3, 5, 2),
(9, 39, 7, 3, 6, 2),
(10, 40, 8, 3, 7, 3),
(11, 41, 9, 3, 8, 2),
(12, 42, 5, 3, 9, 3),
(13, 43, 3, 3, 10, 2),
(14, 44, 11, 3, 11, 4),
(15, 45, 2, 3, 12, 3);

-- --------------------------------------------------------

--
-- Table structure for table `task_images`
--

CREATE TABLE `task_images` (
  `id` int(11) NOT NULL,
  `filePath` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task_images`
--

INSERT INTO `task_images` (`id`, `filePath`) VALUES
(30, 'file-1651658792627.png'),
(31, 'file-1651658851334.png'),
(32, 'file-1651658911902.png'),
(33, 'file-1651659010617.png'),
(34, 'file-1651695101954.png'),
(35, 'file-1651695154466.png'),
(36, 'file-1651695164053.png'),
(37, 'file-1651695210467.png'),
(38, 'file-1651695231827.png'),
(39, 'file-1651695252230.png'),
(40, 'file-1651695274185.png'),
(41, 'file-1651695302698.png'),
(42, 'file-1651695319936.png'),
(43, 'file-1651695404655.png'),
(44, 'file-1651695433650.png'),
(45, 'file-1651695441568.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(46) NOT NULL,
  `passw` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `passw`, `is_admin`) VALUES
(1, 'zilahi@gmail.com', 'Hello', 0),
(2, 'zilahi_2@gmail.com', 'Hello', 0),
(3, 'zilahi_3@gmail.com', 'Hello', 0),
(4, 'test', 'test', 0),
(5, 'test22', 'test', 0),
(6, 'demo', 'demo1234', 0),
(7, 'hello_test', '12345', 0),
(8, 'newestdemo_check', 'Demo', 0),
(9, 'zilahijfodjfodsijf', 'widofjsdofjdsofjds', 0),
(10, 'zilahijfodjfodsijfr4r4r4', 'widofjsdofjdsofjds', 0),
(11, 'hello', 'Be+VbM7cCD0+IqcQkoEr+g==$au7q2dU8/zZWI31WZrmrzLSBFyb78+ObrMja9GrWOhV+KTnuITz+ExVOe0hmWzYzB8cgfq6xQ85zmBoGbHhFHA==', 0),
(12, 'hello', 'XUZIBb0sR1ogZYma0GL7wA==$fSLvJkG8cAbGG8hELV7JBeF6J0VVCcM2Rj6iTRdwoPyYjgBu4YIuLg+6XOhbGHL8fBAmaTTLvteDA5/+s9jIUQ==', 0),
(13, 'hello', 'GiwCzENa8XlCZF8uJVVlKQ==$xBYjnzHj397DtkGeig5lIu3MySWb5F9jzdiHi/GQhIE+EBKU0xBiRyckQcVedmD0kAFalLKI7Y/1go+0yxzoMA==', 0),
(14, 'hello', 'd7HYl9COiiZQ0pDHz/aoRA==$H5Pb5l2gqfD2Q37bhw6tNVZUl/9xRIMf+jk/hqlX6S3kS3lTzYZUp8+xjrg/KylHBpPz0pBAezeZ4DM539EKGw==', 0),
(15, 'hello', 'A423MrClk9odF13sW8g6yQ==$SegGmLK70Z+C/fDomUMs8H6IGiEgUxyTx2PK2wuWORtDHKWCoTNHZP63aQwHXn63epctMMbyW8T2UsT5jNRL2w==', 0),
(16, 'hello', 'YEVtkXTPWfdu0fC9zyOT7A==$YogbjdGEV1Z/mtEfH2nvO88Xhsusr5TzvOunwGkfnvg4xTPEOXW39djQWmo5DKKYe2ecQ5VzVl7kOpHxBXbMqw==', 0),
(17, 'hello', 'tJaDXQDWFTlJN3fvNSxeDg==$HWTu87JGwLtEr4jzhPvzLAO2j0TZSSIagULw6THr3k/tvNTGL7FUzghbjf51//jaa/u2xjWfBbRtrLCaikrJeQ==', 0),
(18, 'hello', 'hBHdvZ54uSEmXekb5Onbjw==$o5o7gkb7sSH0litnlF0czD2aWuaaNwhztSKz0g3bvSLYJTUU9JPbdls9AW5r6uql0hnOBUmRX9cGngpReY4uTg==', 0),
(19, 'hello', 'oBhZqHxDsiNC5nSG5wSmcQ==$OnvwsmJBDb1esELRKG9+LnYub1aYD9m2bkmQNZoWybZhbEn70zPWKzk91ZREmmvQlL96gxkNR3DQD2hDJOo5bw==', 0),
(20, 'hello', 'cMSua7xU8nw6pFGCQssclA==$g8YaGsUsNfW4R1HGs00i6AeoUqYLlhkj5zae+lO340yY7v9vHm/X1prNNA1Lk0IgZZwQoQeW2SSNSpK8BdVO/A==', 0),
(21, 'hello@demo.com', '5SvwcXbBiL17nfUSPQaGVQ==$A3WIzKn/h+ypgf18Irr85rnz0vU7YZWk1cTQ6y3003fwFKCYUdA1Ibw+PZhR9pSgFgtVfOsRaVedDOaQnzQ+aA==', 0),
(22, 'hello@demo.com', '4Fejpq9jJIiD3XiJE36BOw==$7msSJ2wG3VmX97EPwP65h0nDiABPk81IWFeY0G2U9qJzcWEtrSrfsnIB43DAqi2UBYcSYvfFEy2LJrVA3WzxBw==', 0),
(23, 'hello@demo.com', 'PFReeIsjH2WJVm6c3dTc5A==$cspnxBy1KW2YUh4IOQ/RVhXiiQbjq2vYpuYDL4HXdRVT0auUbePWQvpH9OwD5YeK8F+VS1O0oPOb/bYmGKjWTQ==', 0),
(24, 'ilyennincs@gmail.com', 'LTbaQivHuPyvWRVbzYcftw==$JDy6qzQgpjcvmxdP8BMpdFm1iMiI5q71CKJeviqk7MmoKEMCiuwQi0Si0tRNnG9jn+1Rikm+xeCFEbddF8HABA==', 0),
(25, '1234567@gmail.com', 'du5B5wpXKwPq5G4Vnic7QA==$a9Yqs8NmijPMm5ZVHlrrFlodPytK+dx8ZJFze0+MQsKEmHw/V/EuTxE8QXPhuH11ml7U8BBA8GZK6DGVLdfztw==', 0),
(26, 'fudhjdiowhjfeior@gmail.com', '/zX7BVpRVGPkl/GxG8egng==$o1W8V3+Ea3jGxywyU5oX9TBLyK3+EX2W5wpUQBfXQ4nXA2kCukWUMJyzWWw8jO4AWsebEuUiUx0Gq6mmBO8pYQ==', 0),
(27, 'kefhierghufodhglef@gmail.com', 'nGjrprZ/nQu0Grh129/4dA==$A6YYLU9UU7ZWfVGjtrXpHg/tTcfCASkJnySMW91PMZnqsMCZmVNXmyfG7TSa6ERT9aUGmvra1V28w7wF3E9vkw==', 0),
(28, 'wfjehrgirehgiuerhguireh@gmail.com', 'VSmWXeZXndiX0HOwUfYuUQ==$G//olsDUubCIZw5Zg3e6pz7gLKpHWCYK6Bt7WZQBKlMKRl9D8b+vAxT5e80Sm2DB8j/s3uVs2GBqqO3K3gUIPQ==', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`category_id`),
  ADD KEY `fk_period` (`period_id`),
  ADD KEY `fk_task_image` (`task_image_id`);

--
-- Indexes for table `task_images`
--
ALTER TABLE `task_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `periods`
--
ALTER TABLE `periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `task_images`
--
ALTER TABLE `task_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_period` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`),
  ADD CONSTRAINT `fk_task_image` FOREIGN KEY (`task_image_id`) REFERENCES `task_images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
