var page = require('page')
var dom = require('dom')
var mustache = require('mustache').render

module.exports = templater

function templater (contentSelector, routes, renderer) {
  if (!renderer) renderer = function (ctx) {
    var target = dom(contentSelector)
    var compiled = mustache(ctx.template, ctx.data)
    target.html(compiled)
    ctx.onrender(ctx.params, ctx.data)
    if (ctx.scroll) window.scrollTo(0,0)
  }

  if (!contentSelector) throw new Error('contentSelector required')
  if (!routes || !routes.length) throw new Error('routes should be a list of route objects')

  page('*', index)
  createRoutes(0)
  page('*', renderer)

  function index (ctx, next) {
    // default for all pages
    ctx.onrender = function () {}
    ctx.data = {}
    next()
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
      ctx.scroll = route.scroll || true
      if (route.onrender) ctx.onrender = route.onrender
      next()
    })
  })
  cb()
}
