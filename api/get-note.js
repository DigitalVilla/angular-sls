const Response = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const util = require('./common/utils')

const TableName = process.env.NOTES_TABLE

/**
 * Route: GET /note/{note_id}
 */
exports.handler = async (event) => {
  try {
    const note_id = decodeURIComponent(event.pathParameters.note_id)
    const data = await Dynamo.query({
      TableName,
      IndexName: 'note_id-index',
      keyCondition: 'note_id',
      keyValue: note_id,
      Limit: 1,
    })

    if (!util.isEmpty(data.Items))
      return Response.success({ body: data.Items[0] })

    return Response.error({
      error: {
        statusCode: 404,
        message: `Item ${note_id} not found`,
      },
    })
  } catch (error) {
    return Response.error({ error })
  }
}
