const Response = require('./common/API_Responses')
const Dynamo = require('./common/Dynamo')
const util = require('./common/utils')
const { v4: uuid } = require('uuid')
const TableName = process.env.NOTES_TABLE

/**
 * Route: POST /note
 */
exports.handler = async (event) => {
  try {
    let Item = JSON.parse(event.body).Item
    Item.user_id = event.headers.app_user_id
    Item.user_name = event.headers.app_user_name
    Item.note_id = `${Item.user_id}:${uuid()}`
    Item.timestamp = util.getTimestamp()
    Item.expires = util.setTimeExpiry(3, 'day')
    Item.updated = 0

    await Dynamo.put({ Item, TableName })

    return Response.success({ body: Item })
  } catch (error) {
    return Response.error({ error })
  }
}
