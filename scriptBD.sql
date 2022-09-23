DROP DATABASE IF EXISTS ecommerce_perfuma_db;

-- Cria banco de dados
CREATE DATABASE ecommerce_perfuma_db;

-- Seleciona banco de  dados para uso
USE ecommerce_perfuma_db;

-- Cria tabela de usuário
CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    image VARCHAR(400),
    is_active TINYINT DEFAULT 1,
    is_admin TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Altera tabela
-- ALTER TABLE users ADD is_admin TINYINT DEFAULT 0;
    

-- Insere um ou mais usuário
INSERT INTO users (name, last_name, email, password, image)
VALUES 
	("Henrique", "Serra", "henrique@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Luana", "Silva", "luana@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Fernanda", "Silva", "fernanda@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Beatriz", "Pereira", "beatriz@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Ana Maria", "Rodrigues", "ana@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Roberto", "Souza", "roberto@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Pedro Álvares", "Cabral", "pedro@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Ricardo", "Santos", "ricardo@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Ana Beatriz", "Souza", "anabeatriz@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Matheus", "Lucas", "matheus@email.com", "12345678", "c81a386493658f2006dc.png"),
    ("Pedro", "Santana", "pedrosantana@email.com", "12345678", "c81a386493658f2006dc.png");

-- Inserindo um usuário administrador


-- Inserindo um ou mais usuários administrador
INSERT INTO users (name, last_name, email, password, image, is_active, is_admin)
VALUES 
	("Luiz", "Souza", "luiz@email.com", "12345678", "c81a386493658f2006dc.png", 0, 0),
    ("Leo", "Porto Maranhão", "leo.porto.lpm@hotmail.com", "$2b$10$lZLQpjsfxt5VpWsbvm5vO.VkT9joaVqPwntkussKBXn5BDLECYx1e", "c81a386493658f2006dc.png", 1, 1),
    ("Ana", "Kelly", "kelly@hotmail.com", "$2b$10$lZLQpjsfxt5VpWsbvm5vO.VkT9joaVqPwntkussKBXn5BDLECYx1e", "c81a386493658f2006dc.png", 1, 0),
    ("Maria", "Carolina", "maria@hotmail.com", "$2b$10$lZLQpjsfxt5VpWsbvm5vO.VkT9joaVqPwntkussKBXn5BDLECYx1e", "c81a386493658f2006dc.png", 1, 0);

-- Lista todos os usuários
SELECT * FROM users;

-- UPDATE users SET is_admin = 1 WHERE id = 16;

-- Deleta o usuário a partir do id
-- DELETE FROM users WHERE id = 1;

-- Atualiza dados de uma linha
-- UPDATE users 
-- SET 
	-- name = "Henrique Atualizado", 
    -- email = "batatinha@email.com",
   --  birthdate = "1800-11-01"
-- WHERE id = 3;

-- Lista colunas de uma tabela
SELECT name, email FROM users;

-- Renomear colunas e tabelas
SELECT name AS nome, email AS "e-mail" FROM users AS u;

-- Busca todos os usuários que são adm
SELECT * FROM users 
WHERE is_admin = 1;

-- Busca por adm que nasceu depois de 1980
-- SELECT * FROM users 
-- WHERE is_admin = 1 AND birthdate > "1980-01-01";

-- Busca por adm ou usuário que nasceu depois de 1980
-- SELECT * FROM users 
-- WHERE is_admin = 1 OR birthdate > "1980-01-01";

-- Busca usuário com id 1, 4 ou 8
SELECT * FROM users
WHERE id = 1 OR id = 4 OR id= 8;

-- Busca usuário com id 1, 4 ou 8
SELECT * FROM users
WHERE id IN (1, 4, 8);

-- Busca por deternado padrão de string
SELECT * FROM users
WHERE name LIKE "%dro%";

-- Busca por deternado padrão de string
SELECT * FROM users
WHERE name LIKE "Ana%";

-- Busca por deternado padrão de string
SELECT * FROM users
WHERE name LIKE "%S%a";

-- Busca por deternado padrão de string
-- Ordena por nome e depois id
SELECT * FROM users
WHERE name LIKE "%S%a"
ORDER BY name, id DESC;

-- Limita quantidade de linhas
SELECT * FROM users
ORDER BY name
LIMIT 5 OFFSET 5;

-- SELECT * FROM users
-- WHERE id >= 3 AND id <= 10;

-- SELECT * FROM users
-- WHERE id BETWEEN 3 AND 10;

-- SELECT CONCAT("Olá, sou ", name) AS saudacao FROM users;

-- SELECT REPLACE(name, "a", "A") AS "replace" FROM users;

-- Tabela para categorias
CREATE TABLE categorys(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
description TEXT NOT NULL,
is_active TINYINT DEFAULT 1,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela para imagens 
CREATE TABLE images(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  image VARCHAR(400) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela para produtos
CREATE TABLE products (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT	NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT UNSIGNED DEFAULT 0,
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  category_id INT UNSIGNED,
  image_id INT UNSIGNED,
  FOREIGN KEY (category_id) REFERENCES categorys(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
);


-- Tabela para pedidos
CREATE TABLE orders(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  status ENUM("processando", "a caminho", "entregue") DEFAULT "processando",
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id INT UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


-- product 1 - n image
-- Tabela para pedidos


-- users 1 - n orders
-- products n - n orders

-- Tabela intermediária de pedidos e produtos
CREATE TABLE orders_products(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id INT UNSIGNED,
  product_id INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categorys(name, description)
VALUES
("Linha masculina", "Perfumes selecionados para o alvo masculino"),
("Linha feminina", "Perfumes selecionados para o alvo feminino"),
("Linha infantil", "Perfumes selecionados para o alvo infaltil");


-- Lista categorys
SELECT * FROM categorys;

-- Insere um ou mais imagens de produtos
INSERT INTO images (image)
VALUES
('5c44e337a8952067d67c.png'),
('3559c4a90933138eab39.png'),
('f7b9204afaf9afa3d598.png'),
('14bdccbf5ea6c44cbe11.png'),
('269774000d8b80dcd558.png'),
('65a079d92f8649bb0a94.png'),
('70e04da96f69dfe16150.png'),
('ae5ef042e140ecfbae9c.png'),
('b7672ec620b9c8cdd4cc.png'),
('729249da76ed9b13f8a1.png'),
('5eab1531b512d11232f1.png'),
('fb8cec0033901609b3f1.png');

-- Lista de imagens
SELECT * FROM images;


-- Insere um ou mais produtos
INSERT INTO products (name, description, price, category_id, quantity, image_id)
VALUES 
	("CK One", "CK One - Perfume Masculino - Eau de Toilette - 100ml", 29.93, 1, 10, 1),
	("Polo Black", "Polo Black - Perfume Masculino - Eau de Toilette - 100ml", 49.99, 1, 50, 2),
	("Giovanna baby", "Giovanna baby - Perfume Infantil - Eau de Toilette - 100ml", 99.99, 3, 150, 3),
	("Dolce Gabbana", "Dolce Gabban - Perfume Feminino - Eau de Toilette - 100ml", 57.99, 2, 20, 4),
	("Avon baby colônia", "Avon baby colônia - Perfume Infantil - Eau de Toilette - 100ml", 204.99, 3, 60, 5),
    ("Ferrari Black", "Ferrari Black - Perfume Masculino - Eau de Toilette - 100ml", 29.93, 1, 10, 11),
	("Malbec Black", "Malbec Black - Perfume Masculino - Eau de Toilette - 100ml", 49.99, 1, 50, 12),
	("Baby touch", "Baby touch - Perfume Infantil - Eau de Infantil - 100ml", 99.99, 3, 150, 7),
	("Light Blue", "Light Blue - Perfume Feminino - Eau de Toilette - 100ml", 57.99, 2, 20, 10),
	("Johnson's baby", "Johnson's baby - Perfume Infantil - Eau de Toilette - 100ml", 204.99, 3, 60, 6),
	("Lady Million", "Lady Million - Perfume Feminino - Eau de Toilette - 100ml", 57.99, 2, 20, 8),
    ("Chanel nº5", "Chanel nº5 - Perfume Feminino - Eau de Toilette - 100ml", 57.99, 2, 20, 9);

-- Lista produtos
SELECT * FROM products;



-- Insere um ou mais pedidos
INSERT INTO orders (status, user_id)
VALUES 
	("entregue", 3),
    ("entregue", 5),
    ("processando", 6),
    ("a caminho", 3),
    ("entregue", 15),
    ("processando", 15),
    ("a caminho", 14),
    ("processando", 1),
    ("entregue", 2),
    ("processando", 3),
    ("entregue", 4),
    ("a caminho", 7);
    
    
-- Lista pedidos
SELECT * FROM  orders;

-- Insere um ou mais produtos
INSERT INTO orders_products (order_id, product_id)
VALUES 
	(1, 1),
    (1, 2),
    (2, 1),
    (2, 5),
    (3, 2),
    (3, 4),
    (4, 1),
    (4, 2),
    (5, 2),
    (6, 3),
    (6, 2),
    (5, 5),
    (7, 6),
    (7, 7),
    (8, 8),
    (8, 9),
    (9, 10),
    (9, 11),
    (10, 12),
    (10, 7),
    (11, 8),
    (11, 7),
    (12, 9),
    (12, 10);
    
-- Lista pedidos-produtos
SELECT * FROM orders_products;

-- Lista pedidos concatenado com pedidos-produtos e produtos
SELECT * FROM orders 
INNER JOIN orders_products ON orders.id = orders_products.order_id
INNER JOIN products ON products.id = orders_products.product_id;


-- Lista produtos concatenado com categorias
SELECT * FROM products
INNER JOIN categorys ON categorys.id = products.category_id;

-- Lista pedidos concatenado com pedidos-produtos e produtos
-- aplicado com alias
SELECT * FROM orders AS o
INNER JOIN orders_products AS op ON o.id = op.order_id
INNER JOIN products AS p ON p.id = op.product_id;

-- Lista usuarios concatenado com pedidos
SELECT * FROM users
INNER JOIN orders ON users.id = orders.user_id;


-- Lista usuarios concatenado com pedidos
-- aplicado com alias
SELECT * FROM users AS u
INNER JOIN orders AS o ON u.id = o.user_id;

SELECT * FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;

SELECT * FROM orders AS o
INNER JOIN orders_products AS op ON o.id = op.order_id
RIGHT JOIN products AS p ON p.id = op.product_id;