import json
import urllib3
import boto3
from botocore.exceptions import ClientError
from classes.hourly import Hourly
from classes.weather import Weather
from classes.city import City
from datetime import date

today = date.today()
d1 = today.strftime("%d/%m/%Y")

ACCESS_KEY='SQS_ACCESS_KEY'
SECRET_KEY='SQS_SECRET_KEY'
SQS_URL='SQS_URL'

H24=24
LAT = 40.4165
LON = -3.7026
APPID = 'appid_openweathermap'

#London
#LAT = 51.5085
#LON = -0.1257

#Paris
#LAT = 48.8534
#LON = 2.3488

c = City('Madrid', LAT, LON)

def lambda_handler(event, context):
    
    try:
        sqsClient = boto3.client("sqs",aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    
        http = urllib3.PoolManager()
        myheaders = {'Content-Type': 'application/json'}
        
        resp = http.request("GET", "https://api.openweathermap.org/data/2.5/onecall?lat="+str(LAT)+"&lon="+str(LON)+"&units=metric&exclude=current,minutely,daily,alerts&appid="+APPID, headers = myheaders)
    
        dataJson = json.loads(resp.data)
        
        for i in range(H24):
            
            date = d1+"-"+str(i)+":00"
            dataHour = dataJson['hourly'][i]
            dataHourWeather = dataHour['weather'][0]
            
            w = Weather(dataHourWeather['id'], dataHourWeather['main'], dataHourWeather['description'], dataHourWeather['icon'])
            
            h = Hourly(dataHour['temp'], dataHour['feels_like'], dataHour['pressure'], dataHour['humidity'], dataHour['wind_speed'], date,c.__dict__, w.__dict__)
            
            sqsClient.send_message(QueueUrl=SQS_URL, MessageBody=json.dumps(h.__dict__))
    
        return {
            'statusCode': 200,
            'body': json.dumps('Madrid is inspected')
        }
    except ClientError as e:
        if e.response['ResponseMetadata']['HTTPStatusCode'] != 200:
            return{
                'statusCode': e.response['ResponseMetadata']['HTTPStatusCode'],
                'body': json.dumps(e.response['Error']['Message'])
            }
    
    
