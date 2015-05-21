# a-simple-templater

[![NPM](https://nodei.co/npm/a-simple-templater.png)](https://nodei.co/npm/a-simple-templater/)

Make your routes. Uses mustache templates by default.

Your index.js
```js
var templater = require('a-simple-templater');
var fs = require('fs')

var routes = [
  {
    url: '/',
    template: '<h1>{{title}}</h1>',
    data: function (params, cb)  {
      cb({
        title: 'hey whats up ' + params.id
      })
    }
  },
  {
    url: '/hello/:id',
    template: fs.readFileSync('templates/blog.html').toString(),
    data: function (params, cb) {
      cb({
        greeting: 'hello',
        place: 'world'
      })
    },
    onrender: function (params, data) {
      console.log('hello', data.place, params.id)
    }
  }
]

templater('#content', routes)
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

### A trick for gh-pages:

Rename index.html to 404.html and then symlink index to 404.
```
ln -s 404.html index.html
```

### Overriding the default rendering engine (mustache) to use handlebars, for example:
```js
var Handlebars = require('handlebars')
templater('#content', routes, function (source, data) {
  var template = Handlebars.compile(source)
  return template(data)
})
```

### TODO
  * handle 404s correctly. make the 404.html trick for gh-pages not be necessary

