var page = require('page')
var dom = require('dom')
var mustache = require('mustache').render

module.exports = templater

function templater (contentSelector, routes, renderer) {
  if (!renderer) renderer = mustache
  if (!contentSelector) throw new Error('contentSelector required')
  if (!routes || !routes.length) throw new Error('routes should be a list of route objects')

  page('*', index)
  createRoutes(0)
  page('*', render)

  function index (ctx, next) {
    // default for all pages
    ctx.onrender = function () {}
    ctx.data = {}
    next()
  }

  function render (ctx, next) {
    var target = dom(contentSelector)
    var compiled = renderer(ctx.template, ctx.data)
    target.html(compiled)
    ctx.onrender(ctx.params, ctx.data)
  }

  function createRoutes (i) {
    if (i === routes.length) return
    else makePage(routes[i], function () {
      createRoutes(i+1)
    })
  }
  page()
}

function makePage (route, cb) {
  page(route.url, function (ctx, next) {
    if (!route.data) route.data = function (params, cb) { cb({}) }

    route.data(ctx.params, function (data) {
      ctx.template = route.template
      ctx.data = data
      if (route.onrender) ctx.onrender = route.onrender
      next()
    })
  })
  cb()
}
