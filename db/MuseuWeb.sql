-- phpMyAdmin SQL Dump
-- version 5.2.3-2.fc44
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 19/09/2026 às 18:25
-- Versão do servidor: 11.8.8-MariaDB
-- Versão do PHP: 8.5.10

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
  `data_criacao` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `obj_audios`
--

CREATE TABLE `obj_audios` (
  `obj_textura_id` int(11) NOT NULL,
  `modelo_id` int(11) NOT NULL,
  `audio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `obj_texturas`
--

CREATE TABLE `obj_texturas` (
  `obj_textura_id` int(11) NOT NULL,
  `modelo_id` int(11) NOT NULL,
  `textura_id` int(11) NOT NULL
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
  ADD KEY `fk_modelo` (`modelo_id`);

--
-- Índices de tabela `obj_audios`
--
ALTER TABLE `obj_audios`
  ADD PRIMARY KEY (`obj_textura_id`),
  ADD KEY `fk_obj_audios` (`modelo_id`),
  ADD KEY `fk_audio_obj` (`audio_id`);

--
-- Índices de tabela `obj_texturas`
--
ALTER TABLE `obj_texturas`
  ADD PRIMARY KEY (`obj_textura_id`),
  ADD KEY `fk_obj_textura` (`modelo_id`),
  ADD KEY `fk_textura_obj` (`textura_id`);

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
-- AUTO_INCREMENT de tabela `obj_audios`
--
ALTER TABLE `obj_audios`
  MODIFY `obj_textura_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `obj_texturas`
--
ALTER TABLE `obj_texturas`
  MODIFY `obj_textura_id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_modelo` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`modelo_id`);

--
-- Restrições para tabelas `obj_audios`
--
ALTER TABLE `obj_audios`
  ADD CONSTRAINT `fk_audio_obj` FOREIGN KEY (`audio_id`) REFERENCES `audios` (`audio_id`),
  ADD CONSTRAINT `fk_obj_audios` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`modelo_id`);

--
-- Restrições para tabelas `obj_texturas`
--
ALTER TABLE `obj_texturas`
  ADD CONSTRAINT `fk_obj_textura` FOREIGN KEY (`modelo_id`) REFERENCES `modelos` (`modelo_id`),
  ADD CONSTRAINT `fk_textura_obj` FOREIGN KEY (`textura_id`) REFERENCES `texturas` (`textura_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
