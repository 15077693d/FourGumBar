const routes = require('next-routes')
module.exports = routes()
.add('home','/','index')
.add('campaign','/campaign/:address','campaign/index')