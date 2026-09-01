-- phpMyAdmin SQL Dump
-- version 5.2.3-2.fc44
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 01/09/2026 às 02:32
-- Versão do servidor: 11.8.8-MariaDB
-- Versão do PHP: 8.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `MuseuWeb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `audios`
--

CREATE TABLE `audios` (
  `audio_id` int(11) NOT NULL,
  `diretorio` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `modelos`
--

CREATE TABLE `modelos` (
  `modelo_id` int(11) NOT NULL,
  `diretorio` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `dimensao_x` decimal(10,0) NOT NULL,
  `dimensao_y` decimal(10,0) NOT NULL,
  `dimensao_z` decimal(10,0) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `objetos`
--

CREATE TABLE `objetos` (
  `objeto_id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `modelo_id` int(11) NOT NULL,
  `textura_id` int(11) NOT NULL,
  `audio_id` int(11) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `texturas`
--

CREATE TABLE `texturas` (
  `textura_id` int(11) NOT NULL,
  `diretorio` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `audios`
--
ALTER TABLE `audios`
  ADD PRIMARY KEY (`audio_id`);

--
-- Índices de tabela `modelos`
--
ALTER TABLE `modelos`
  ADD PRIMARY KEY (`modelo_id`);

--
-- Índices de tabela `objetos`
--
ALTER TABLE `objetos`
  ADD PRIMARY KEY (`objeto_id`),
  ADD KEY `fk_modelo` (`modelo_id`),
  ADD KEY `fk_textura` (`textura_id`),
  ADD KEY `fk_audio` (`audio_id`);

--
-- Índices de tabela `texturas`
--
ALTER TABLE `texturas`
  ADD PRIMARY KEY (`textura_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `audios`
--
ALTER TABLE `audios`
  MODIFY `audio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `modelos`
--
ALTER TABLE `modelos`
  MODIFY `modelo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `objetos`
--
ALTER TABLE `objetos`
  MODIFY `objeto_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `texturas`
--
ALTER TABLE `texturas`
  MODIFY `textura_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `objetos`
--
ALTER TABLE `objetos`
  ADD CONSTRAINT `fk_audio` FOREIGN KEY (`audio_id`) REFERENCES `audios` (`audio_id`),
  ADD CONSTRAINT `fk_modelo` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`modelo_id`),
  ADD CONSTRAINT `fk_textura` FOREIGN KEY (`textura_id`) REFERENCES `texturas` (`textura_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
