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

CREATE TABLE inspirationalGiphies (
  	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`url` VARCHAR(200) NOT NULL UNIQUE
);

INSERT INTO inspirationalGiphies (`url`) VALUES
("https://media0.giphy.com/media/yoJC2K6rCzwNY2EngA/200.gif"),
("https://media3.giphy.com/media/l0HenK7c1NEKDZ6Ug/200.gif"),
("https://media0.giphy.com/media/3ofT5ISstLshYolhSg/200.gif"),
("https://media1.giphy.com/media/sb9e1LGnHoZkA/200.gif"),
("https://media2.giphy.com/media/l0MYIPPIievzLd2W4/200.gif"),
("https://media3.giphy.com/media/3oEduLl7trWHEWdO5a/200.gif"),
("https://media0.giphy.com/media/xT9IgEYXCNqPZnqMuY/200.gif"),
("https://media3.giphy.com/media/l41Yh1olOKd1Tgbw4/200.gif"),
("https://media3.giphy.com/media/yLzaPIw1LLHZS/200.gif"),
("https://media0.giphy.com/media/3og0IPMeREHpEV0f60/200.gif"),
("https://media3.giphy.com/media/oGO1MPNUVbbk4/200.gif"),
("https://media2.giphy.com/media/j5QcmXoFWl4Q0/200.gif"),
("https://media0.giphy.com/media/vgUFOWBwBkziE/200.gif"),
("https://media0.giphy.com/media/urVY61nyYSTJK/200.gif"),
("https://media2.giphy.com/media/Z2lMI3RoVv2ne/200.gif"),
("https://media3.giphy.com/media/b5WsjNpMc35za/200.gif"),
("https://media0.giphy.com/media/11lbipplIWvyDu/200.gif"),
("https://media1.giphy.com/media/3ohs7IaSo4fordCeBi/200.gif"),
("https://media3.giphy.com/media/V9ppKIzlMhdtK/200.gif"),
("https://media1.giphy.com/media/26FPGx0DlC41diyGI/200.gif"),
("https://media3.giphy.com/media/K0usvg1aP657W/200.gif"),
("https://media3.giphy.com/media/l0MYIUtKEoWwLpkgE/200.gif"),
("https://media2.giphy.com/media/l41Yv2teINpIfGRq0/200.gif"),
("https://media0.giphy.com/media/l0Ex94k4G50W8XYK4/200.gif"),
("https://media2.giphy.com/media/l0MYRVeAShhGN2iOs/200.gif"),
("https://media3.giphy.com/media/l3vR1tvIhCrrZsty0/200.gif"),
("https://media2.giphy.com/media/3ohfFt7UUK4TxWZmdG/200.gif"),
("https://media3.giphy.com/media/l2YSyNKf0NfUVRlmM/200.gif"),
("https://media3.giphy.com/media/l0HlH3PTYdqBNOks8/200.gif"),
("https://media2.giphy.com/media/3o85xIehqbS3TVyLN6/200.gif"),
("https://media1.giphy.com/media/3oriNLByHRslONfBjW/200.gif"),
("https://media2.giphy.com/media/3oKIPi7bLv57FJlLoI/200.gif"),
("https://media3.giphy.com/media/l0HU6Orl4E2QhkJws/200.gif"),
("https://media1.giphy.com/media/l2JhsRuHMwphncN4k/200.gif"),
("https://media1.giphy.com/media/12vJgj7zMN3jPy/200.gif"),
("https://media1.giphy.com/media/L7i2GzkuS7WKc/200.gif"),
("https://media2.giphy.com/media/nwyqBwP65XCAU/200.gif"),
("https://media2.giphy.com/media/ln4bohPvHhwgo/200.gif"),
("https://media1.giphy.com/media/26gs9oNcFxokURtvO/200.gif"),
("https://media2.giphy.com/media/3o7aD0VFO3mMYfc4Zq/200.gif"),
("https://media2.giphy.com/media/xUOxeZF7MXxLY8CMda/200.gif"),
("https://media1.giphy.com/media/4N92MXJGhkylrQHnlX/200.gif"),
("https://media3.giphy.com/media/xUn3C8WqEzUEeQoRa0/200.gif"),
("https://media0.giphy.com/media/xT4uQcvDww0HEJYA36/200.gif"),
("https://media1.giphy.com/media/1ymqBka0e0A43Ii16c/200.gif"),
("https://media2.giphy.com/media/bbSHTifp07KtmsthrV/200.gif"),
("https://media0.giphy.com/media/8BkIs96btJryzkSEg9/200.gif"),
("https://media1.giphy.com/media/3o752fkeJl4JMuNX20/200.gif"),
("https://media3.giphy.com/media/lcESTlcK3Au1cJdeh6/200.gif"),
("https://media2.giphy.com/media/AiEqHIvf5Mbgj44fGE/200.gif"),
("https://media1.giphy.com/media/kgSmpMWy3sEHXLk1sd/200.gif"),
("https://media2.giphy.com/media/1euO5up0bfLaofrU5a/200.gif"),
("https://media0.giphy.com/media/uFi7UjeCAyuroalvoz/200.gif"),
("https://media1.giphy.com/media/9oIZiH4SARA0okwt5O/200.gif"),
("https://media1.giphy.com/media/g0NnVp7H6PvzxGrbkc/200.gif"),
("https://media2.giphy.com/media/1d5WQNqwASIDPjDszk/200.gif"),
("https://media1.giphy.com/media/g4IP5h88PVv1JqD3PO/200.gif"),
("https://media1.giphy.com/media/3b6vzyT3cnf1pcVwqQ/200.gif"),
("https://media2.giphy.com/media/xiYMKfSvqx4YqbN6wA/200.gif"),
("https://media2.giphy.com/media/1fXcl6MEoOQvbOw3ZS/200.gif"),
("https://media2.giphy.com/media/4N1DMVIiuRYtWXIsze/200.gif"),
("https://media0.giphy.com/media/l0HUn55mA1ZXbFYCk/200.gif"),
("https://media2.giphy.com/media/26DNclzgKrUGQjDDa/200.gif"),
("https://media0.giphy.com/media/3ohjUNM8QvnOZSjmmI/200.gif"),
("https://media3.giphy.com/media/oy89IK46hy0QZLy3ep/200.gif"),
("https://media2.giphy.com/media/3ohhwI2IGOTOm2LbJ6/200.gif"),
("https://media0.giphy.com/media/l4FGF6KxS3cabPqSI/200.gif"),
("https://media3.giphy.com/media/jHRUDwVkWOXhv8j6Bp/200.gif"),
("https://media3.giphy.com/media/26n6HhI1SV46DgLiU/200.gif"),
("https://media2.giphy.com/media/3ohzdS8356NgZ7tw4w/200.gif"),
("https://media2.giphy.com/media/AEHRueSSWdbk4/200.gif"),
("https://media2.giphy.com/media/xT8qB8nJJO5Vye6r1C/200.gif"),
("https://media2.giphy.com/media/l4EpeHUelkIdOcQ0g/200.gif"),
("https://media0.giphy.com/media/3o7btX1biI4YEx0jzG/200.gif"),
("https://media2.giphy.com/media/xT1R9ZSvkEdlHluG6A/200.gif"),
("https://media3.giphy.com/media/l0ErOholJjSmFlMFG/200.gif"),
("https://media0.giphy.com/media/3otPoQGAj8sXfc7nhu/200.gif"),
("https://media0.giphy.com/media/WOlGUpwXavEre/200.gif"),
("https://media1.giphy.com/media/8FuMcd7vGO6dRKScnE/200.gif"),
("https://media0.giphy.com/media/l0ErF2i4YCrQwRBMQ/200.gif"),
("https://media3.giphy.com/media/xT4Aphm45GMfpVEUxO/200.gif"),
("https://media1.giphy.com/media/3o8doUbvtMVY2y09qM/200.gif"),
("https://media1.giphy.com/media/3otPozQx87Fj9tkki4/200.gif"),
("https://media1.giphy.com/media/l3fQgjVoyZ1I4EyOs/200.gif"),
("https://media3.giphy.com/media/GVMhZwYv8U5NK/200.gif"),
("https://media2.giphy.com/media/26gskaXMHwQFmuXAc/200.gif"),
("https://media2.giphy.com/media/l1J3QMgxq4SS8EHXa/200.gif"),
("https://media2.giphy.com/media/xUA7bf3sHeSuIKF1mg/200.gif"),
("https://media0.giphy.com/media/3owyoYqpufITS7pPeE/200.gif"),
("https://media0.giphy.com/media/sFWDp31gcfPSo/200.gif"),
("https://media1.giphy.com/media/LnaPDokBEmONG/200.gif"),
("https://media3.giphy.com/media/3ohc1cBc5pZXSgv8GI/200.gif"),
("https://media3.giphy.com/media/7fj4un4Rd4YTK/200.gif");

