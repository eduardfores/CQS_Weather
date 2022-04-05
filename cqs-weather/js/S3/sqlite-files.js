/**
 * This function return all posts saved in the /posts directory from our S3.
 * 
 * @returns data object (json) with posts from S3
 */
 const getDBs = () => {
    var response = s3.listObjectsV2({ Prefix: 'databases/' }).promise();
    return response;
}