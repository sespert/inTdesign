DROP DATABASE IF EXISTS inTdesign_db;
CREATE DATABASE inTdesign_db;
USE inTdesign_db;

CREATE TABLE userInfo (
	id INT AUTO_INCREMENT,
	name VARCHAR (255) NOT NULL,
	yelpId VARCHAR (30),
    address VARCHAR (255) NOT NULL DEFAULT "[]",
    phone VARCHAR (20) NOT NULL,
    email VARCHAR (255) NOT NULL,
    logo VARCHAR (255),
    coordinates VARCHAR (255) DEFAULT "[]",
    rating VARCHAR (4),
    pictures TEXT DEFAULT "[]",
    schedule TEXT DEFAULT "{}",
    services VARCHAR (255) DEFAULT "MENU COMING SOON",
    aboutUs TEXT,
    businessType INT NOT NULL, 
    modules VARCHAR (20) DEFAULT "[]",
    PRIMARY KEY (id)
);

CREATE TABLE businessType (
    id INT AUTO_INCREMENT,
    typeName VARCHAR(100) NOT NULL,   
    interests VARCHAR (100) DEFAULT "[]",
    modules VARCHAR (100) DEFAULT "[]",
    PRIMARY KEY (id)
);

CREATE TABLE modules (
    id INT AUTO_INCREMENT,
    moduleName VARCHAR(100) NOT NULL,    
    PRIMARY KEY (id)
);



