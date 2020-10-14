const Response = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const TableName = process.env.NOTES_TABLE

/**
 * Route: GET /notes
 */
exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters
    const user_id = event.headers.app_user_id
    const startTimestamp = query && query.start ? parseInt(query.start) : 0

    const params = {
      TableName,
      keyCondition: 'user_id',
      keyValue: user_id,
      ScanIndexForward: false,
      Limit: query && query.limit ? parseInt(query.limit) : 5,
    }

    if (startTimestamp > 0) {
      params.ExclusiveStartKey = {
        user_id: user_id,
        timestamp: startTimestamp,
      }
    }

    const body = await Dynamo.query(params)

    return Response.success({ body })
  } catch (error) {
    return Response.error({ error })
  }
}
