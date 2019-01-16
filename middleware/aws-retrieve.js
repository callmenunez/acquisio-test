const AWS = require('aws-sdk');

exports.databaseRetrieve = (req, res, next) => {
  AWS.config.update({
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com'
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const customCode = req.params.customCode;
  const queryParams = {
    TableName: 'salesDemo',
    ProjectionExpression: 'customCode, identifierCode, repName, repTitle, repPhone, repEmail, repImage, repId, customerName, customerSegment, screenShareType, demoUrl',
    KeyConditionExpression: 'customCode = :customCode',
    ExpressionAttributeValues: {
      ':customCode': customCode
    },
    ScanIndexForward: true
  };
  docClient.query(queryParams, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
      next();
    }
    else {
      if (data.Count === 0) {
        res.repName = '';
        res.repTitle = '';
        res.repPhone = '';
        res.repEmail = '';
        res.repImage = '';
        res.repId = '';
        res.customerName = '';
        res.customerSegment = '';
        res.screenShareType = '';
        res.screenShareCode = '';
        res.property = '';
        res.customCode = '';
      }
      else {
        res.repName = data.Items[0].repName;
        res.repTitle = data.Items[0].repTitle;
        res.repPhone = data.Items[0].repPhone;
        res.repEmail = data.Items[0].repEmail;
        res.repImage = data.Items[0].repImage;
        res.repId = data.Items[0].repId;
        res.customerName = data.Items[0].customerName;
        res.customerSegment = data.Items[0].customerSegment;
        res.screenShareType = data.Items[0].screenShareType;
        res.screenShareCode = data.Items[0].demoUrl;
        res.property = data.Items[0].property;
        res.customCode = data.Items[0].customCode;
      }
      next();
    }
  });
};

exports.middlewareStack = [
  exports.databaseRetrieve
];
