var S3ClientFactory = {};
S3ClientFactory.newClient = function (config) {
    var albumBucketName = BUCKET_NAME;

    AWS.config.region = REGION_NAME;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
    });

    // Create a new service object
    var s3 = new AWS.S3({
        apiVersion: '2022-03-04',
        params: { Bucket: albumBucketName }
    });
  
    return s3;
};