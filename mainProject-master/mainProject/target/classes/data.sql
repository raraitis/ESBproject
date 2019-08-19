DROP TABLE IF EXISTS starwars;

CREATE TABLE starwars (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  director VARCHAR NOT NULL,
  release_date VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  episode_id VARCHAR
);

