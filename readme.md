# a-simple-templater

[![NPM](https://nodei.co/npm/a-simple-templater.png)](https://nodei.co/npm/a-simple-templater/)

Make your routes. Uses handlebars templates by default.

Your index.js
```js
var templater = require('a-simple-templater');
var fs = require('fs')

var routes = [
  {
    url: '/blog/:id',
    template: fs.readFileSync('templates/blog.html').toString(),
    data: function (params, cb) {
      cb({
        title: 'hello',
        text: 'world'
      })
    },
    onrender: function (params) {
      console.log('hello world', params)
    }
  },
  {
    url: '/',
    template: '<h1>{{title}}</h1>',
    data: function (params, cb)  {
      cb({
        title: 'hey whats up'
      })
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

A trick for gh-pages:
```
ln -s index.html 404.html
```

### TODO
  * handle 404s correctly. make the 404.html trick for gh-pages not be necessary

