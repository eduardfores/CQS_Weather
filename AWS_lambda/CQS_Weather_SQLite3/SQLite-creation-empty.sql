CREATE TABLE IF NOT EXISTS City(
  id integer NOT NULL,
  name text NOT NULL,
  lat float NOT NULL,
  lon float NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS Weather(
  id integer NOT NULL,
  weatherId integer NOT NULL,
  main text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  PRIMARY KEY (id));
  
CREATE TABLE IF NOT EXISTS Hourly(
  id integer NOT NULL,
  temp float NOT NULL,
  feelsLike float NOT NULL,
  pressure integer NOT NULL,
  humidity integer NOT NULL,
  windSpeed float NOT NULL,
  date text NOT NULL,
  cityIdRef integer NOT NULL,
  weatherIdRef integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(cityIdRef) REFERENCES City(id),
  FOREIGN KEY(weatherIdRef) REFERENCES Weather(id));