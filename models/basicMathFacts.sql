CREATE DATABASE IF NOT EXISTS mathpractice_db;
USE mathpractice_db;

CREATE TABLE basicMathFacts (
	`problem` VARCHAR(10) NOT NULL PRIMARY KEY,
	`type` ENUM('addition', 'subtraction', 'multiplication', 'division') NOT NULL,
	`ease` INT NOT NULL DEFAULT 0, 
	`left` INT NOT NULL,
	`right` INT NOT NULL,
	`solution` INT NOT NULL
);

CREATE TABLE problemStats (
	`problem_id` VARCHAR(10) NOT NULL,
	`learner_id` VARCHAR(100) NOT NULL, 
	`attempts` INT NOT NULL DEFAULT 0, 
	`correct` INT NOT NULL DEFAULT 0, 
	`streak` INT NOT NULL DEFAULT 0, 
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`problem_id`) REFERENCES basicMathFacts(`problem`),
	FOREIGN KEY (`learner_id`) REFERENCES learners(`google_id`)
);
