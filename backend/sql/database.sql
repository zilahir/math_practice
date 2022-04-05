CREATE DATABASE IF NOT EXISTS  erettsegi

USE erettsegi

DROP TABLE IF EXISTS
    users,
    tasks

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email VARCHAR (46) NOT NULL,
    passw VARCHAR (255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    CONSTRAINT pk_users PRIMARY KEY (
        id
    )
);

CREATE TABLE `erettsegi`.`tasks`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `task_image_id` INT NOT NULL,
    `topic_id` INT NOT NULL,
    `period_id` INT NOT NULL,
    `task_no` INT NOT NULL,
    `task_point_no` INT NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY fk_topic(topic_id) REFERENCES topics(id),
    FOREIGN KEY fk_period(period_id) REFERENCES periods(id),
    FOREIGN KEY fk_task_image(task_image_id) REFERENCES task_images(id)
) ENGINE = InnoDB;