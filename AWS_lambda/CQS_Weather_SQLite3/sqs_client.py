import json
import boto3
from classes.hourly import Hourly
from classes.weather import Weather
from classes.city import City

ACCESS_KEY='SQS_ACCESS_KEY'
SECRET_KEY='SQS_SECRET_KEY'
SQS_URL='SQS_URL'

class SQSClient:
  def __init__(self):
    global sqsClient
    sqsClient = boto3.client("sqs",aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    
  def count_messages_queue(self):
    attributes = sqsClient.get_queue_attributes(QueueUrl=SQS_URL, AttributeNames=['ApproximateNumberOfMessages'])
    return attributes['Attributes']['ApproximateNumberOfMessages']
    
  def get_message(self):
    msg = sqsClient.receive_message(QueueUrl=SQS_URL)
    message = msg['Messages'][0]
    
    sqsClient.delete_message(QueueUrl=SQS_URL,ReceiptHandle=message['ReceiptHandle'])
    
    return self.set_hourly(message) 
      
  def set_hourly(self, message):
    hourlyJson = self.prepare_json(message)
    city = self.set_city(hourlyJson['city'])
    weather = self.set_weather(hourlyJson['weather'])
    
    return self.set_hourly_object(hourlyJson, city, weather)
    
  def prepare_json(self, message):
    strMsg = json.dumps(message)
    jsonMsg = json.loads(strMsg)
    hourlyJson = json.loads(jsonMsg['Body'])
    return hourlyJson
    
  def set_city(self, citydict):
    return City(citydict['name'], citydict['lat'], citydict['lon'])

  def set_weather(self, weatherDict):
    return Weather(weatherDict['weather_id'], weatherDict['main'], weatherDict['description'], weatherDict['icon'])
      
  def set_hourly_object(self, hourlyJson, city, weather):
    return Hourly(hourlyJson['temp'], hourlyJson['feels_like'], hourlyJson['pressure'], hourlyJson['humidity'], hourlyJson['wind_speed'], hourlyJson['date'], city, weather)