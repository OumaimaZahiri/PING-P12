-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 13 juin 2022 à 11:42
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `contour_evaluation`
--

-- --------------------------------------------------------

--
-- Structure de la table `contour`
--

CREATE TABLE `contour` (
  `id_contour` int(10) NOT NULL,
  `path` varchar(100) NOT NULL,
  `scan_path` varchar(100) NOT NULL,
  `is_handcrafted` tinyint(1) DEFAULT NULL,
  `ct_root` varchar(100) NOT NULL,
  `ct_first_item` int(10) NOT NULL,
  `ct_last_item` int(10) NOT NULL,
  `id_organ` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contour`
--

INSERT INTO `contour` (`id_contour`, `path`, `scan_path`, `is_handcrafted`, `ct_root`, `ct_first_item`, `ct_last_item`, `id_organ`) VALUES
(1, './Dicom_Files/Contours/AnalCanal/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 346, 378, 1),
(2, './Dicom_Files/Contours/AnalCanal/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 351, 371, 1),
(3, './Dicom_Files/Contours/BoneIliumL/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 150, 276, 2),
(4, './Dicom_Files/Contours/BoneIliumL/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 151, 274, 2),
(5, './Dicom_Files/Contours/BoneIliumR/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 154, 279, 3),
(6, './Dicom_Files/Contours/BoneIliumR/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 155, 277, 3),
(7, './Dicom_Files/Contours/BrachialPlexusL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 231, 289, 4),
(8, './Dicom_Files/Contours/BrachialPlexusL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 234, 307, 4),
(9, './Dicom_Files/Contours/BrachialPlexusR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 219, 290, 5),
(10, './Dicom_Files/Contours/BrachialPlexusR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 221, 297, 5),
(11, './Dicom_Files/Contours/Brain/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 24, 156, 6),
(12, './Dicom_Files/Contours/Brain/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 23, 150, 6),
(13, './Dicom_Files/Contours/BrainStem/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 101, 156, 7),
(14, './Dicom_Files/Contours/BrainStem/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 102, 150, 7),
(15, './Dicom_Files/Contours/Chiasm/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 105, 112, 8),
(16, './Dicom_Files/Contours/Chiasm/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 106, 113, 8),
(17, './Dicom_Files/Contours/CochleaL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 126, 131, 9),
(18, './Dicom_Files/Contours/CochleaL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 126, 129, 9),
(19, './Dicom_Files/Contours/CochleaR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 128, 132, 10),
(20, './Dicom_Files/Contours/CochleaR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 128, 131, 10),
(21, './Dicom_Files/Contours/Esophagus/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 276, 362, 11),
(22, './Dicom_Files/Contours/Esophagus/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 274, 380, 11),
(23, './Dicom_Files/Contours/FermoralHeadL/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 277, 374, 12),
(24, './Dicom_Files/Contours/FermoralHeadL/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 277, 371, 12),
(25, './Dicom_Files/Contours/FermoralHeadR/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 280, 371, 13),
(26, './Dicom_Files/Contours/FermoralHeadR/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 280, 369, 13),
(27, './Dicom_Files/Contours/Larynx/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 227, 278, 14),
(28, './Dicom_Files/Contours/Larynx/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 242, 274, 14),
(29, './Dicom_Files/Contours/LensL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 111, 118, 15),
(30, './Dicom_Files/Contours/LensL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 114, 117, 15),
(31, './Dicom_Files/Contours/Lips/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 157, 196, 16),
(32, './Dicom_Files/Contours/Lips/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 152, 197, 16),
(33, './Dicom_Files/Contours/Mandible/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 133, 217, 17),
(34, './Dicom_Files/Contours/Mandible/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 134, 216, 17),
(35, './Dicom_Files/Contours/OpticNerveL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 108, 117, 18),
(36, './Dicom_Files/Contours/OpticNerveL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 107, 117, 18),
(37, './Dicom_Files/Contours/OpticNerveR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 110, 119, 19),
(38, './Dicom_Files/Contours/OpticNerveR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 108, 118, 19),
(39, './Dicom_Files/Contours/OralCavity/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 157, 216, 20),
(40, './Dicom_Files/Contours/OralCavity/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 157, 204, 20),
(41, './Dicom_Files/Contours/ParotidL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 144, 196, 21),
(42, './Dicom_Files/Contours/ParotidL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 143, 196, 21),
(43, './Dicom_Files/Contours/ParotidR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 147, 199, 22),
(44, './Dicom_Files/Contours/ParotidR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 144, 198, 22),
(45, './Dicom_Files/Contours/PenileBulb/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 348, 366, 23),
(46, './Dicom_Files/Contours/PenileBulb/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 344, 368, 23),
(47, './Dicom_Files/Contours/Pituitary/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 113, 123, 24),
(48, './Dicom_Files/Contours/Pituitary/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 115, 121, 24),
(49, './Dicom_Files/Contours/Rectum/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 255, 345, 25),
(50, './Dicom_Files/Contours/Rectum/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 254, 350, 25),
(51, './Dicom_Files/Contours/Thyroid/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 257, 314, 26),
(52, './Dicom_Files/Contours/Thyroid/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 257, 314, 26),
(53, './Dicom_Files/Contours/Trachea/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 1, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 279, 340, 27),
(54, './Dicom_Files/Contours/Trachea/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 0, 'CT_1.2.840.113704.7.1.0.18317622184172152.1648135228', 274, 351, 27),
(55, './Dicom_Files/Contours/Vessie/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 243, 306, 28),
(56, './Dicom_Files/Contours/Vessie/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 0, 'CT_1.2.840.113704.7.1.0.182231177252224.1648735459', 243, 306, 28);

-- --------------------------------------------------------

--
-- Structure de la table `organ`
--

CREATE TABLE `organ` (
  `id_organ` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `organ`
--

INSERT INTO `organ` (`id_organ`, `name`) VALUES
(1, 'AnalCanal'),
(2, 'BoneIliumL'),
(3, 'BoneIliumR'),
(4, 'BrachialPlexusL'),
(5, 'BrachialPlexusR'),
(6, 'Brain'),
(7, 'BrainStem'),
(8, 'Chiasm'),
(9, 'CochleaL'),
(10, 'CochleaR'),
(11, 'Esophagus'),
(12, 'FermoralHeadL'),
(13, 'FermoralHeadR'),
(14, 'Larynx'),
(15, 'LensL'),
(16, 'Lips'),
(17, 'Mandible'),
(18, 'OpticNerveL'),
(19, 'OpticNerveR'),
(20, 'OralCavity'),
(21, 'ParotidL'),
(22, 'ParotidR'),
(23, 'PenileBulb'),
(24, 'Pituitary'),
(25, 'Rectum'),
(26, 'Thyroid'),
(27, 'Trachea'),
(28, 'Vessie');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contour`
--
ALTER TABLE `contour`
  ADD PRIMARY KEY (`id_contour`),
  ADD UNIQUE KEY `path` (`path`),
  ADD KEY `fk_contour_organ` (`id_organ`);

--
-- Index pour la table `organ`
--
ALTER TABLE `organ`
  ADD PRIMARY KEY (`id_organ`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contour`
--
ALTER TABLE `contour`
  MODIFY `id_contour` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `organ`
--
ALTER TABLE `organ`
  MODIFY `id_organ` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contour`
--
ALTER TABLE `contour`
  ADD CONSTRAINT `fk_contour_organ` FOREIGN KEY (`id_organ`) REFERENCES `organ` (`id_organ`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;