-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2026 at 03:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `legacy basketball hub 2` 
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `descripcion`) VALUES
(1, 'Balones Profesionales', 'Balones profesionales para competencias'),
(2, 'Zapatillas', 'Calzado especializado para baloncesto'),
(3, 'Camisetas', 'Camisetas deportivas'),
(4, 'Shorts', 'Shorts para baloncesto'),
(5, 'Medias', 'Medias deportivas'),
(6, 'Muñequeras', 'Muñequeras para jugadores'),
(7, 'Rodilleras', 'Proteccion para las rodillas'),
(8, 'Gorras', 'Gorras deportivas'),
(9, 'Mochilas', 'Mochilas deportivas'),
(10, 'Guantes', 'Guantes deportivos'),
(11, 'Conos', 'Conos para entrenamiento'),
(12, 'Camisetas NBA', 'Camisetas de equipos NBA'),
(13, 'Balones infantiles', 'Balones para niños'),
(14, 'Bandas elasticas', 'Bandas para entrenamiento'),
(15, 'Accesorios', 'Otros accesorios deportivos');

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido`, `telefono`, `correo`, `direccion`) VALUES
(1, 'Daniel', 'Escobar', '3009999999', 'daniel.nuevo@gmail.com', 'Bogota'),
(2, 'Carlos', 'Rodriguez', '3001111111', 'carlos@gmail.com', 'Medellin'),
(3, 'Juan', 'Martinez', '3025551234', 'juan@gmail.com', 'Cali'),
(4, 'Andres', 'Gomez', '3034567890', 'andres@gmail.com', 'Bogota'),
(5, 'Santiago', 'Perez', '3045678901', 'santiago@gmail.com', 'Barranquilla'),
(6, 'Mateo', 'Lopez', '3056789012', 'mateo@gmail.com', 'Bogota'),
(7, 'Sebastian', 'Torres', '3067890123', 'sebastian@gmail.com', 'Cali'),
(8, 'Nicolas', 'Ramirez', '3078901234', 'nicolas@gmail.com', 'Medellin'),
(9, 'Felipe', 'Moreno', '3089012345', 'felipe@gmail.com', 'Bogota'),
(10, 'David', 'Castro', '3090123456', 'david@gmail.com', 'Pereira'),
(11, 'Alejandro', 'Vargas', '3101234567', 'alejandro@gmail.com', 'Bogota'),
(12, 'Samuel', 'Rojas', '3112345678', 'samuel@gmail.com', 'Cali'),
(13, 'Miguel', 'Hernandez', '3123456789', 'miguel@gmail.com', 'Medellin'),
(14, 'Esteban', 'Mendoza', '3134567890', 'esteban@gmail.com', 'Bogota'),
(15, 'Cristian', 'Navarro', '3145678901', 'cristian@gmail.com', 'Cartagena');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detalle_venta`
--

INSERT INTO `detalle_venta` (`id_detalle`, `id_venta`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 1, 2, 180000.00),
(2, 2, 2, 1, 220000.00),
(3, 3, 3, 1, 550000.00),
(4, 4, 4, 2, 480000.00),
(5, 5, 5, 1, 180000.00),
(6, 6, 6, 2, 170000.00),
(7, 7, 7, 3, 95000.00),
(8, 8, 8, 2, 60000.00),
(9, 9, 9, 1, 50000.00),
(10, 10, 10, 2, 85000.00);

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellido`, `cargo`, `telefono`, `correo`) VALUES
(1, 'Laura', 'Perez', 'Gerente', '3159999999', 'laura.nueva@tiendabaloncesto.com'),
(2, 'Andres', 'Gomez', 'Vendedor', '3162345678', 'andres@tiendabaloncesto.com'),
(3, 'Camilo', 'Ruiz', 'Vendedor Senior', '3173456789', 'camilo@tiendabaloncesto.com'),
(4, 'Valentina', 'Diaz', 'Vendedor', '3184567890', 'valentina@tiendabaloncesto.com'),
(5, 'Maria', 'Torres', 'Cajera', '3195678901', 'maria@tiendabaloncesto.com'),
(6, 'Jorge', 'Rojas', 'Vendedor', '3206789012', 'jorge@tiendabaloncesto.com'),
(7, 'Paula', 'Castro', 'Cajera', '3217890123', 'paula@tiendabaloncesto.com'),
(8, 'Diego', 'Moreno', 'Vendedor', '3228901234', 'diego@tiendabaloncesto.com'),
(9, 'Sofia', 'Vargas', 'Administrador', '3239012345', 'sofia@tiendabaloncesto.com'),
(10, 'Mateo', 'Hernandez', 'Vendedor', '3240123456', 'mateo@tiendabaloncesto.com'),
(11, 'Juliana', 'Mendoza', 'Vendedor', '3251234567', 'juliana@tiendabaloncesto.com'),
(12, 'Felipe', 'Navarro', 'Cajero', '3262345678', 'felipe@tiendabaloncesto.com'),
(13, 'Nicolas', 'Suarez', 'Vendedor', '3273456789', 'nicolas@tiendabaloncesto.com'),
(14, 'Laura', 'Molina', 'Vendedor', '3284567890', 'lauram@tiendabaloncesto.com'),
(15, 'Daniel', 'Ramirez', 'Administrador', '3295678901', 'danielr@tiendabaloncesto.com');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `talla` varchar(20) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `marca`, `talla`, `precio`, `stock`, `id_categoria`) VALUES
(1, 'Balon Spalding Profesional', 'Spalding', '7', 200000.00, 25, 1),
(2, 'Balon Wilson Evolution', 'Wilson', '7', 220000.00, 20, 1),
(3, 'Zapatillas Air Jordan', 'Jordan', '42', 570000.00, 8, 2),
(4, 'Zapatillas LeBron', 'Nike', '41', 480000.00, 10, 2),
(5, 'Camiseta Lakers', 'Nike', 'L', 180000.00, 12, 3),
(6, 'Camiseta Bulls', 'Nike', 'M', 170000.00, 14, 3),
(7, 'Short Adidas Basketball', 'Adidas', 'M', 95000.00, 20, 4),
(8, 'Medias Nike Elite', 'Nike', 'M', 60000.00, 25, 5),
(9, 'Munequera Jordan', 'Jordan', 'Unica', 50000.00, 18, 6),
(10, 'Rodillera Adidas', 'Adidas', 'L', 85000.00, 16, 7),
(11, 'Gorra NBA', 'New Era', 'Unica', 110000.00, 10, 8),
(12, 'Mochila Basketball', 'Nike', 'Unica', 210000.00, 9, 9),
(13, 'Balon Infantil', 'Molten', '5', 90000.00, 25, 13),
(14, 'Banda Elastica', 'Adidas', 'Unica', 45000.00, 30, 14),
(15, 'Conos de Entrenamiento', 'Spalding', 'Unica', 70000.00, 22, 11);

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_cliente` int(11) DEFAULT NULL,
  `id_empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`id_venta`, `fecha`, `id_cliente`, `id_empleado`) VALUES
(1, '2026-08-01 10:00:00', 1, 1),
(2, '2026-08-02 10:15:00', 2, 2),
(3, '2026-08-03 11:20:00', 3, 3),
(4, '2026-08-04 12:10:00', 4, 4),
(5, '2026-08-05 13:30:00', 5, 5),
(6, '2026-08-06 14:45:00', 6, 6),
(7, '2026-08-07 15:20:00', 7, 7),
(8, '2026-08-08 16:10:00', 8, 8),
(9, '2026-08-09 17:25:00', 9, 9),
(10, '2026-08-10 18:00:00', 10, 10),
(11, '2026-08-11 18:30:00', 11, 11),
(12, '2026-08-12 19:00:00', 12, 12),
(13, '2026-08-13 19:30:00', 13, 13),
(14, '2026-08-14 20:00:00', 14, 14),
(15, '2026-08-15 20:30:00', 15, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indexes for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
