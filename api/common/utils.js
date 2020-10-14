const getTimestamp = () => Math.floor(Date.now() / 1000)

const setTimeExpiry = (length = 1, interval, timestamp) => {
  const ts = timestamp || getTimestamp()
  switch (interval) {
    case 'minute':
      return ts + Math.floor(length * 60)
    case 'day':
      return ts + Math.floor(length * 86400)
    case 'month':
      return ts + Math.floor(length * 2629800)
    case 'year':
      return ts + Math.floor(length * 31557600)
    case 'hour':
    default:
      return ts + Math.floor(length * 3600)
  }
}

const isEmpty = (obj) => {
  if (obj.length !== undefined) return obj.length === 0
  else return Object.keys(obj).length === 0
}

module.exports = {
  getTimestamp,
  setTimeExpiry,
  isEmpty,
}
