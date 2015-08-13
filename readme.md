# page-router

Powerfully simple client-side ajax template router built on page.js.

[![NPM](https://nodei.co/npm/page-router.png)](https://nodei.co/npm/page-router/)

**index.js**
```js
var router = require('page-router');
var fs = require('fs')

var routes = [
  {
    url: '/',
    template: '<h1>{{title}}</h1>',
    data: function (params, render)  {
      // get data to be rendered in the template
      render({
        title: 'hey whats up' // this object will be available in the template
      })
    }
  },
  {
    url: '/post/:id',
    template: '<h1>{{post.title}}</h1>'
    data: function (params, render) {
      // your route to get data. do some stuff
      get_post(params.id, function (err, data) {
        render({ post: post })
      })
    },
    onrender: function (params, data) {
      // do something after the page is rendered
      console.log('hello', params.id, data.post)
    }
  }
]

router('#content', routes)
```

Your index.html
```html
<html>
<body>
  <div id="content"></div>
  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
```

### Using browserify

If you use [browserify](http://github.com/substack/browserify) (recommended), you can use `fs.readFileSync(template_path).toString()` to load the file into the client-side javascript bundle.

Example:
```js
var fs = require('fs')

var routes = [
{
  url: '/post/:id',
  template: fs.readFileSync('templates/post.html').toString()
  onrender: function (params, data) {
    console.log('hello', params.id, data.post)
  }
]
```

### Use with gh-pages

Rename index.html to 404.html and then symlink index to 404.
```
ln -s 404.html index.html
```

### Overriding the default rendering engine (mustache) to use handlebars, for example:
```js
var Handlebars = require('handlebars')
router('#content', routes, function (source, data) {
  var template = Handlebars.compile(source)
  return template(data)
})
```

### turn off auto-scroll
When you click, the router will automatically scroll to the top (see line 28 of index.js). Use `scroll: false` in any route definition to turn this off.

### TODO
  * handle 404s correctly. make the 404.html trick for gh-pages not be necessary

