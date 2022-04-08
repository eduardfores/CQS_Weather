import json
import boto3
import os
from datetime import date

today = date.today()
d1 = today.strftime("%d-%m-%Y") + datetime.timedelta(days=1)

ACCESS_KEY='S3_ACCESS_KEY'
SECRET_KEY='S3_SECRET_KEY'
BUCKET_NAME="BUCKET_NAME"
PATH="databases"
NAME_FILE="/database"+d1+".db"
TMP_PATH="/tmp"+NAME_FILE

class S3Client:
    
  def __init__(self):
    global s3
    s3 = boto3.client("s3",aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
  
  def create_db_file(self):
    f = open(TMP_PATH, "rb")
    
    s3.put_object(ACL='public-read', Bucket=BUCKET_NAME, Key=PATH + NAME_FILE, 
    Body=f.read(), CacheControl="max-age=0,no-cache,no-store,must-revalidate",
        ContentType="binary/octet-stream")
    
    os.remove(TMP_PATH)

  def get_temporary_file(self):
      return TMP_PATH