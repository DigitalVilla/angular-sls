const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
  async get({ Key, TableName }) {
    const data = await documentClient.get({ TableName, Key }).promise()
    if (!data || !data.Item) return throwError('GET', TableName, Key)
    return data.Item
  },
  async put({ Item, TableName }) {
    const res = await documentClient.put({ TableName, Item }).promise()
    if (!res) return throwError('PUT', TableName, Item)
    return res
  },
  async update({ Item, TableName, keyCondition }) {
    const res = await documentClient
      .put({
        Item,
        TableName,
        ConditionExpression: '#t = :t',
        ExpressionAttributeNames: { '#t': keyCondition },
        ExpressionAttributeValues: { ':t': Item[keyCondition] },
      })
      .promise()

    if (!res) return throwError('PUT', TableName, Item)

    return res
  },
  async query({ TableName, keyValue, keyCondition, ...rest }) {
    const exp = {}
    exp[`:${keyCondition}`] = keyValue

    const res = await documentClient
      .query({
        TableName,
        KeyConditionExpression: `${keyCondition} = :${keyCondition}`,
        ExpressionAttributeValues: exp,
        ...rest,
      })
      .promise()

    if (!res) return throwError('QUERY', TableName, exp)

    return res
  },
  async delete({ Key, TableName }) {
    return await documentClient.delete({ TableName, Key }).promise()
  },
}

function throwError(method, TableName, resource) {
  throw Error(
    `Dynamo Error: ${method} | Table: ${TableName} | Resource: ${JSON.stringify(
      resource,
      null,
      2
    )}`
  )
}

module.exports = Dynamo
