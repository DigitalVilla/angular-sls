const Response = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const util = require('./common/utils')
const TableName = process.env.NOTES_TABLE

/**
 * Route: PATCH /note
 */
exports.handler = async (event) => {
  try {
    let Item = JSON.parse(event.body).Item
    Item.user_id = event.headers.app_user_id
    Item.user_name = event.headers.app_user_name
    Item.updated = util.getTimestamp()
    Item.expires = util.setTimeExpiry(3, 'day')

    const newItem = await Dynamo.update({
      Item,
      TableName,
      KeyCondition: 'timestamp',
    })

    return Response.success({ body: newItem })
  } catch (error) {
    return Response.error({ error })
  }
}
