CREATE DATABASE IF NOT EXISTS mathpractice_db;
USE mathpractice_db;

CREATE TABLE additionFacts (
	`problem` VARCHAR(10) NOT NULL PRIMARY KEY,
	`attempts` INT NOT NULL DEFAULT 1, 
	`correct` INT NOT NULL DEFAULT 0, 
	`streak` INT NOT NULL DEFAULT 0, 
	`learner_id` VARCHAR(50) NOT NULL, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);

CREATE TABLE subtractionFacts (
	`problem` VARCHAR(10) NOT NULL PRIMARY KEY,
	`attempts` INT NOT NULL DEFAULT 1, 
	`correct` INT NOT NULL DEFAULT 0, 
	`streak` INT NOT NULL DEFAULT 0, 
	`learner_id` VARCHAR(50) NOT NULL, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);

CREATE TABLE multiplicationFacts (
	`problem` VARCHAR(10) NOT NULL PRIMARY KEY,
	`attempts` INT NOT NULL DEFAULT 1, 
	`correct` INT NOT NULL DEFAULT 0,
	`streak` INT NOT NULL DEFAULT 0,  
	`learner_id` VARCHAR(50) NOT NULL, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);

CREATE TABLE divisionFacts (
	`problem` VARCHAR(10) NOT NULL PRIMARY KEY,
	`attempts` INT NOT NULL DEFAULT 1, 
	`correct` INT NOT NULL DEFAULT 0,
	`streak` INT NOT NULL DEFAULT 0,  
	`learner_id` VARCHAR(50) NOT NULL, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);