// watch for changes in components
require('../components')

const webpackHotMiddlewareClient = require('webpack-hot-middleware/client')
webpackHotMiddlewareClient.subscribe(function (updatedEvent) {
  if (updatedEvent.type === 'design-changed') {
    window.location.reload()
  }
})
