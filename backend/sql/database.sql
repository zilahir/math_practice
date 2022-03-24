CREATE DATABASE IF NOT EXISTS  erettsegi

USE erettsegi

DROP TABLE IF EXISTS
    users


CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email VARCHAR (46) NOT NULL,
    passw VARCHAR (255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    CONSTRAINT pk_users PRIMARY KEY (
        id
    )
);
