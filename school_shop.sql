-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Sty 15, 2025 at 04:10 AM
-- Wersja serwera: 9.0.1
-- Wersja PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_shop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` enum('food','drink','accessory') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image_url`, `description`, `quantity`, `price`, `category`) VALUES
(1, 'Kanapka', 'kanapka.jpg', 'Kanapka z szynką, serem oraz sosem do kanapka', 10, 14.99, 'food'),
(2, 'Sok pomarańczowy', 'orange_juice.jpg', 'Sok 100% pomarańczowy 0.5L', 2, 5.49, 'drink'),
(3, 'Zeszyt A5', 'notebook.jpg', 'Jednokolorowy zeszyt wymiaru A5', 30, 14.99, 'accessory'),
(4, 'Coca-Cola', 'coca-cola.jpg', 'napoj gazowany Coca-Cola', 5, 5.00, 'drink'),
(8, 'Hot Dog', 'hot-dogv1.jpg', 'Hot Dog z parówką, musztardom oraz keczupem', 50, 6.99, 'food'),
(9, 'Pizza', 'pizza.jpg', 'Pizza Salami, sos pomidorowy oraz ser mozzarella 24cm', 15, 25.99, 'food'),
(10, 'Długopis', 'pen.jpg', 'Niebieski długopis', 87, 1.99, 'accessory'),
(11, 'Linijka ', 'rural.jpg', 'Linijka - 30cm', 13, 5.49, 'accessory'),
(12, 'Woda Żywiec Zdrój', 'waterv1.jpg', 'Woda 500ml ', 65, 2.49, 'drink'),
(13, 'Tymbark - różne smaki', 'tymbark.jpg', 'Sok tymbark w szkle, różne smaki (250ml)', 34, 3.50, 'drink'),
(14, 'Kawa parzona', 'coffee.jpg', 'Kawa parzona w kubku (200ml)\nz mlekiem lub bez', 15, 7.99, 'drink'),
(15, 'Nożyczki', 'nozyczki.jpg', 'Nożyczki ', 15, 9.99, 'accessory');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_admin`) VALUES
(4, 'test', '$2a$10$VssXOfJZ9Jw/5Ij0IIXLMODqYGjS6ooODTPgENvvy.qtc914tDF8G', 'a@a', 0),
(5, 'casual_user', '$2a$10$xjoHOS6tNc4rNUZrb1da5up7lafXiEAACFw9S26LZx2B/q8oUl.YS', 'user@gmail.com', 0),
(6, 'admin', '$2a$10$ASQ0KYTEH0cPh2/qUs5R1eYmRx7euEKtUr36i6brKHtB4FnOn4WFW', 'admin@gmail.com', 1),
(7, 'user_098', '$2a$10$nF6Q4JpEPyTQ6g7pOtZuKuVHsa9flL5ws4md48xONdLa9pVDUF2lS', 'xyz@xyz', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
