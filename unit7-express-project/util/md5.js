const crypto = require('crypto')
// console.log(crypto)

// const d = crypto.createHash('md5').update('by'+'123456').digest('hex')
// console.log(555, d)

module.exports = str => {
  const d = crypto.createHash('md5').update('by' + str).digest('hex')
  return d
}