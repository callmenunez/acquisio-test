/*eslint-disable */
'use strict';
/*eslint-enable */
const AWS = require('aws-sdk');
const moment = require('moment');

exports.databaseSave = (req, res, next) => {
  AWS.config.update({
    region: 'us-east-1',
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com'
  });
  const docClient = new AWS.DynamoDB.DocumentClient();
  const customerName = req.query.customer_name || req.query.customerName;
  const nameIdentifier = customerName.replace(/\s+/g, '').toLowerCase();
  let brandName;
  const brandDomain = req.headers.host;
  if (brandDomain.indexOf('acquisiodemo') >= 0) {
    brandName = 'Acquisio Demo';
  }
  
  const queryParams = {
    TableName: 'salesDemo',
    IndexName: 'identifierCode-index',
    ProjectionExpression: 'customCode, identifierCode, identifierAmount',
    KeyConditionExpression: 'identifierCode = :identifierCode',
    ExpressionAttributeValues: {
      ':identifierCode': nameIdentifier
    }
  };
  docClient.query(queryParams, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    }
    else {
      if (data.Count === 0) {
        const newIdentifierParams = {
          TableName: 'salesDemo',
          Item: {
            repName: req.query.rep_name || req.query.repName,
            repTitle: req.query.rep_title || req.query.repTitle,
            repPhone: req.query.rep_phone || req.query.repPhone,
            repEmail: req.query.rep_email || req.query.repEmail,
            repImage: req.query.rep_image || req.query.repImage,
            repId: req.query.rep_id || req.query.repId,
            customerName: req.query.customer_name || req.query.customerName,
            customerSegment: req.query.customer_segment || req.query.customerSegment,
            customerPhone: req.query.customer_phone || req.query.customerPhone,
            screenShareType: '0',
            demoUrl: req.query.screen_share_code,
            demoProperty: brandName,
            customCode: nameIdentifier,
            identifierCode: nameIdentifier,
            identifierAmount: 0,
            passcode: ' ',
            externalView: ' ',
            date: moment().format()
          }
        };
        res.customCode = nameIdentifier;
        docClient.put(newIdentifierParams, (saveErr, saveData) => {
          if (saveErr) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(saveErr, null, 2));
          }
          else {
            console.log('Added item:', JSON.stringify(saveData, null, 2));
            next();
          }
        });
      }
      else {
        const oldIdentifierParams = {
          TableName: 'salesDemo',
          Item: {
            repName: req.query.rep_name || req.query.repName,
            repTitle: req.query.rep_title || req.query.repTitle,
            repPhone: req.query.rep_phone || req.query.repPhone,
            repEmail: req.query.rep_email || req.query.repEmail,
            repImage: req.query.rep_image || req.query.repImage,
            repId: req.query.rep_id || req.query.repId,
            customerName: req.query.customer_name || req.query.customerName,
            customerSegment: req.query.customer_segment || req.query.customerSegment,
            customerPhone: req.query.customer_phone || req.query.customerPhone,
            screenShareType: '0',
            demoUrl: req.query.screen_share_code,
            demoProperty: brandName,
            customCode: nameIdentifier + data.Count,
            identifierCode: nameIdentifier,
            identifierAmount: data.Count,
            passcode: ' ',
            externalView: ' ',
            date: moment().format()
          }
        };
        res.customCode = nameIdentifier + data.Count;
        docClient.put(oldIdentifierParams, (saveErr, saveData) => {
          if (saveErr) {
            console.error('Unable to add item. Error JSON:', JSON.stringify(saveErr, null, 2));
          }
          else {
            console.log('Added item:', JSON.stringify(saveData, null, 2));
            next();
          }
        });
      }
    }
  });
};

exports.middlewareStack = [
  exports.databaseSave
];
