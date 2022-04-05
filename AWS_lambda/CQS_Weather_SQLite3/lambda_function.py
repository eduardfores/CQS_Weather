import json
from sqlite_creation import SQLiteCreation
from sqs_client import SQSClient

def lambda_handler(event, context):
    
    sql = SQLiteCreation()
    sqs = SQSClient()
    
    sql.create_database()
    
    numMsg = int(sqs.count_messages_queue())
    
    for x in range(numMsg):
        msg = sqs.get_message()
        sql.insert_message(msg)
    
    sql.save_database()
    
    sql.close_connection()
    
    return {
        'statusCode': 200,
        'body': json.dumps('Database updated! '+str(numMsg))
    }
