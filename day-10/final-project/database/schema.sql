CREATE DATABASE IF NOT EXISTS hygiene_prediction_db;

USE hygiene_prediction_db;


CREATE TABLE IF NOT EXISTS facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    facility_id VARCHAR(50),

    cleanliness_score DECIMAL(5,2) NOT NULL,

    odor_score DECIMAL(5,2) NOT NULL,

    waste_level DECIMAL(5,2) NOT NULL,

    water_availability TINYINT NOT NULL,

    footfall INT NOT NULL,

    complaints INT NOT NULL,

    predicted_risk VARCHAR(20) NOT NULL,

    confidence DECIMAL(5,3) NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (facility_id)
        REFERENCES facilities(facility_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);