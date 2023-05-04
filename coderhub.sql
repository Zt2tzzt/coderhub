/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : coderhub

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 04/05/2023 20:43:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of avatar
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `comment_id`(`comment_id` ASC) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '你美至极~', 28, 10, NULL, '2023-05-02 21:54:09', '2023-05-02 21:54:09');
INSERT INTO `comment` VALUES (7, '你干嘛，哎哟~', 28, 10, 1, '2023-05-03 14:39:46', '2023-05-03 14:39:46');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES (1, '唱歌', '2023-05-03 15:33:58', '2023-05-03 15:33:58');
INSERT INTO `label` VALUES (2, '跳舞', '2023-05-03 15:34:13', '2023-05-03 15:34:13');
INSERT INTO `label` VALUES (3, 'rap', '2023-05-03 15:34:18', '2023-05-03 15:34:18');
INSERT INTO `label` VALUES (4, '篮球', '2023-05-03 15:34:23', '2023-05-03 15:34:23');
INSERT INTO `label` VALUES (5, '生活', '2023-05-03 16:48:35', '2023-05-03 16:48:35');
INSERT INTO `label` VALUES (6, '游戏', '2023-05-03 16:48:35', '2023-05-03 16:48:35');
INSERT INTO `label` VALUES (7, '影视', '2023-05-03 17:05:50', '2023-05-03 17:05:50');
INSERT INTO `label` VALUES (8, '音乐', '2023-05-03 17:47:04', '2023-05-03 17:47:04');
INSERT INTO `label` VALUES (9, '体育', '2023-05-03 17:52:32', '2023-05-03 17:52:32');

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment
-- ----------------------------
INSERT INTO `moment` VALUES (28, '迎面走来的你，让我蠢蠢欲动！', 10, '2023-05-02 18:01:16', '2023-05-02 21:37:29');
INSERT INTO `moment` VALUES (29, '纵然再苦守数百年 我的心意 始终如一', 1, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (30, '曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们', 1, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (31, '不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。', 3, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (32, 'If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。', 1, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (33, '在世间万物中我都发现了你，渺小时，你是阳光下一粒种子，伟大时，你隐身在高山海洋里。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (34, '某一天，突然发现，许多结果都与路径无关。', 4, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (35, '限定目的，能使人生变得简洁。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (36, '翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来', 4, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (37, '一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (38, '不乱于心，不困于情。不畏将来，不念过往。如此，安好。', 3, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (39, '如果你给我的，和你给别人的是一样的，那我就不要了。', 3, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (40, '故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (41, '你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (42, '你如果认识从前的我，也许你会原谅现在的我。', 4, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (43, '每一个不曾起舞的日子，都是对生命的辜负。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (44, '向来缘浅，奈何情深。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (45, '心之所向 素履以往 生如逆旅 一苇以航', 3, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (46, '生如夏花之绚烂，死如秋叶之静美。', 3, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (47, '答案很长，我准备用一生的时间来回答，你准备要听了吗？', 4, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (48, '因为爱过，所以慈悲；因为懂得，所以宽容。', 4, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (49, '我们听过无数的道理，却仍旧过不好这一生。', 1, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (50, '我来不及认真地年轻，待明白过来时，只能选择认真地老去。', 2, '2023-05-02 18:08:59', '2023-05-02 18:08:59');
INSERT INTO `moment` VALUES (52, 'Never mind the Scandal And Landed', 10, '2023-05-03 11:29:17', '2023-05-03 11:29:17');

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id` ASC) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of moment_label
-- ----------------------------
INSERT INTO `moment_label` VALUES (28, 1, '2023-05-03 17:42:19', '2023-05-03 17:42:19');
INSERT INTO `moment_label` VALUES (28, 3, '2023-05-03 17:42:19', '2023-05-03 17:42:19');
INSERT INTO `moment_label` VALUES (28, 6, '2023-05-03 17:45:03', '2023-05-03 17:45:03');
INSERT INTO `moment_label` VALUES (28, 7, '2023-05-03 17:42:19', '2023-05-03 17:42:19');
INSERT INTO `moment_label` VALUES (28, 8, '2023-05-03 17:47:04', '2023-05-03 17:47:04');
INSERT INTO `moment_label` VALUES (28, 9, '2023-05-03 17:52:32', '2023-05-03 17:52:32');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'james', 'e10adc3949ba59abbe56e057f20f883e', '2023-05-02 18:07:25', '2023-05-02 18:07:40', NULL);
INSERT INTO `user` VALUES (2, 'kobe', '7163e7620fab5ee66afb267df9b5b928', '2023-04-29 12:19:25', '2023-05-02 18:07:43', NULL);
INSERT INTO `user` VALUES (3, 'lingard', 'e10adc3949ba59abbe56e057f20f883e', '2023-04-29 12:23:51', '2023-05-02 18:07:45', NULL);
INSERT INTO `user` VALUES (4, 'lilei', '6c44e5cd17f0019c64b042e4a745412a', '2023-04-29 12:31:55', '2023-05-02 18:07:57', NULL);
INSERT INTO `user` VALUES (10, 'zzt', 'e10adc3949ba59abbe56e057f20f883e', '2023-04-30 14:43:29', '2023-05-04 20:38:58', 'http://localhost:8000/users/avatar/10');

SET FOREIGN_KEY_CHECKS = 1;
