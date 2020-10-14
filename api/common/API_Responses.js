const util = require('./utils')

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}

const Response = {
  success: ({ body = {}, status = 200, headers = {} }) => {
    const ok = util.isEmpty(body) ? { message: 'success' } : body
    return {
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(ok),
      statusCode: status,
    }
  },

  error: ({ error = {}, status, headers = {} }) => {
    console.log('Error', error)
    return {
      statusCode: status || error.statusCode || 500,
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify({
        error: error.name || 'Exception',
        message: error.message || 'Unknown error',
      }),
    }
  },
}

module.exports = Response
