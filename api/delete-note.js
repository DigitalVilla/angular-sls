const Response = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')

const TableName = process.env.NOTES_TABLE

/**
 * Route: DELETE /note/{timestamp}
 */
exports.handler = async (event) => {
  try {
    await Dynamo.delete({
      TableName,
      Key: {
        user_id: event.headers.app_user_id,
        timestamp: parseInt(event.pathParameters.timestamp),
      },
    })

    return Response.success({})
  } catch (error) {
    return Response.error({ error })
  }
}
