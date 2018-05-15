const clientApi = require('./client')
const serverApi = require('./server')

// 根据环境 判断使用哪个服务
module.exports = TARGET === 'node' ? serverApi : clientApi
