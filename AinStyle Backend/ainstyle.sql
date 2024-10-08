CREATE DATABASE ainstyle;

CREATE USER 'jinhwan'@'localhost' IDENTIFIED BY 'wjsansrk';

GRANT ALL PRIVILEGES ON ainstyle.* TO 'jinhwan'@'localhost';
FLUSH PRIVILEGES;

USE ainstyle;

CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255),
    email VARCHAR(255),
    phoneNumber VARCHAR(255)
);
