CREATE DATABASE IF NOT EXISTS mathpractice_db;
USE mathpractice_db;

CREATE TABLE learners (
	`google_id` VARCHAR(100) NOT NULL PRIMARY KEY,
	`first` VARCHAR(100) NOT NULL,
	`last` VARCHAR(100) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`imageURL` VARCHAR(200) NOT NULL,
	`date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`last_visit` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE problemCategories (
    `category` VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO problemCategories (`category`) VALUES
("facts"),
("integers");

CREATE TABLE problemSubTypes (
    `type` VARCHAR(25) NOT NULL PRIMARY KEY,
    `difficulty` INT NOT NULL
);

INSERT INTO problemSubTypes (`type`, `difficulty`) VALUES
("addition", 0),
("subtraction", 1),
("multiplication", 2),
("division", 3);

CREATE TABLE problems (
	`problem` VARCHAR(200) NOT NULL PRIMARY KEY,
    `image` VARCHAR(200) DEFAULT "",
	`ease` INT NOT NULL DEFAULT 0, 
	`solution` INT NOT NULL,
    `category` VARCHAR(50),
	`type` VARCHAR(25),
	FOREIGN KEY (`category`) REFERENCES problemCategories(`category`),
	FOREIGN KEY (`type`) REFERENCES problemSubTypes(`type`)
);

CREATE TABLE problemStats (
	`problem_id` VARCHAR(200) NOT NULL,
	`learner_id` VARCHAR(100) NOT NULL, 
	`attempts` INT NOT NULL DEFAULT 0, 
	`correct` INT NOT NULL DEFAULT 0, 
	`streak` INT NOT NULL DEFAULT 0, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`problem_id`) REFERENCES problems(`problem`),
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);

