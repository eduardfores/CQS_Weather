import sqlite3
import boto3
from s3_client import S3Client

BUCKET_NAME='BUCKET_NAME'
TEMPALTE_FILE='SQLite-creation-empty.sql'

INSERT_CITY = "INSERT INTO City(name, lat, lon) VALUES (?, ?, ?)"
INSERT_WEATHER= "INSERT INTO Weather(weatherId, main, description, icon) VALUES (?, ?, ?, ?)"
INSERT_HOURLY= "INSERT INTO Hourly(temp, feelsLike, pressure, humidity, windSpeed, date, cityIdRef, weatherIdRef) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

class SQLiteCreation:
    
  def __init__(self):
    global s3
    s3 = S3Client()
    pass

  def create_database(self):
    global con
    global cur
    
    con = self.sql_connection()
    sql_script = self.get_s3_sql_template()
    
    cur = con.cursor()
    cur.executescript(sql_script)

  def sql_connection(self):
    file = s3.get_temporary_file()
    return sqlite3.connect(file)
    
  def get_s3_sql_template(self):
    s3 = boto3.resource('s3')
    obj = s3.Object(BUCKET_NAME, TEMPALTE_FILE)
    str = obj.get()['Body'].read().decode('utf-8')
    return str
    
  def insert_message(self, hourly):
    #add city if notexists
    city_id=self.insert_city(hourly.city)
    
    #add weather
    weather_id=self.insert_weather(hourly.weather)
    
    #add hourly
    self.insert_hourly(hourly, city_id, weather_id)
    
  def insert_city(self, city):
    result = cur.execute("SELECT * FROM City WHERE name = '%s'" % city.name).fetchall()
    
    if not result:
      #insert city
      cur.execute(INSERT_CITY, (city.name, city.lat, city.lon))
      con.commit()
      
      return cur.lastrowid
    else:
      return result[0][0]
    
  def insert_weather(self, weather):
    cur.execute(INSERT_WEATHER, (weather.weather_id, weather.main, weather.description, weather.icon))
    con.commit()
    return cur.lastrowid
    
  def insert_hourly(self, hourly, city_id, weather_id):
    cur.execute(INSERT_HOURLY, (hourly.temp, hourly.feels_like, hourly.pressure, hourly.humidity, hourly.wind_speed, hourly.date, city_id, weather_id))
    con.commit()
    
  def save_database(self):
    s3.create_db_file()
    
  def close_connection(self):
    con.close()