[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="https://user-images.githubusercontent.com/552629/76405509-87025300-6388-11ea-86c9-af882abb00bd.png" width="80" height="80" />
  <a href="https://github.com/eduardfores/CQS_Weather/blob/main/README_IMGS/Amazon_Web_Services_Logo.png">
    <img src="README_IMGS/Amazon_Web_Services_Logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Serverless Weather in AWS with Edge-Computing </h3>

  <p align="center">
    This project is one serveless application with edge-computing concept executing one little database in SQLite in the client browser. 
    <br />
    <br />
    <a href="http://cqs-weather.s3-website.eu-central-1.amazonaws.com/">Demo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#AWS-architecture">AWS Architecture</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

The project contain one website connected to s3 to download the necessary database to show the weather in different places of the world (Madrid, London, Paris). The files donwload from the S3 are .db files (little files with databases in SQLite). These files are load in the SQLite wasm in the client site and this client process the database
in the browser to show the data.

To simulate the IoT writers I create different lambda functions to send messages with the weather data to SQS and other lambda to receive all messages and create the .db file of the day execution.

So in this project there are:
* Hosting Static web in S3
* The web reads from S3 bucket the database.db files
* SQLite executions in the client site
* SQLite creation files using python and save it in S3

```diff
- The demo may be doesn't charge good the website because the first .db file searched is the current date. e.g. database08-04-2022.db
- To execute this project change the name of the databasedd-mm-yyyy.db with the current date and add it in your S3 Bucket insite the /database directory
```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- BUILT STARTED -->
### Built With

This section list the frameworks/libraries used to create this blog. 

* [S3 AWS](https://aws.amazon.com/es/s3/)
* [Lambda AWS](https://aws.amazon.com/es/lambda/)
* [SQS AWS](https://aws.amazon.com/es/sqs/)
* [JavaScript](https://www.javascript.com/)
* [SQLite](https://sql.js.org/)
* [Python](https://www.python.org/)
* [Boto3](https://aws.amazon.com/es/sdk-for-python/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

In this section I explain you about how you can import this project to your AWS account to test it. 

### Prerequisites

This is an example of how to install the functions you need to use the software and how to install them.

* S3 configuration

You have to configure S3 with static host endpoint 
[Hosting Static in AWS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

<p style="color: red"> All files in this bucket must be PUBLIC </p>

* SQS configuration

You must create a standard queue in SQS service
[Create queue in AWS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-create-queue.html)

<p style="color: red"> You can create a FIFO queue but for this project is not necessary </p>

* IAM premissions

You must create one user to give permissions to put files in S3 you can use the file [PutObject.json](https://github.com/eduardfores/CQS_Weather/blob/main/AWS_permissions/PutObject.json) to create these permissions. This user will used fom the Lambda function to save the .db files in /databases directory of your S3 Bucket. The ACCESS_KEY and SECRET_KEY have to be add in the python file [S3 Client](https://github.com/eduardfores/CQS_Weather/blob/main/AWS_lambda/CQS_Weather_SQLite3/s3_client.py).

Other user necessary for this project is one user with the permissions in SQS to administrate the queue you can use the default policy created by AWS with full access in SQS the name of this policy is *AmazonSQSFullAccess*. The ACCESS_KEY and SECRET_KEY have to be add in the python files [SQS Client](https://github.com/eduardfores/CQS_Weather/blob/main/AWS_lambda/CQS_Weather_SQLite3/sqs_client.py) and [CQS_Weather_Madrid](https://github.com/eduardfores/CQS_Weather/blob/main/AWS_lambda/CQS_Weather_Madrid/CQS_Weather_Madrid.py).

The credentials to read S3 from the HTML you have to fill the information of [credentials.js](https://github.com/eduardfores/CQS_blog/blob/main/js/credentials/credentials.js). In this case we don't need a user because we use the cognito-identity directly. The permisions for this new rol can be [ListObject.json](https://github.com/eduardfores/CQS_blog/blob/main/AWS_permissions/ListObject.json)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/eduardfores/CQS_Weather/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/eduard-for%C3%A9s-ferrer-354b61163/