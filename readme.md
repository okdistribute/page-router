# a-simple-templater

[![NPM](https://nodei.co/npm/a-simple-templater.png)](https://nodei.co/npm/a-simple-templater/)

Make your routes. Uses handlebars templates by default.

A trick for gh-pages:
```
ln -s index.html 404.html
```

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

```html
<html>
<body>
  <div id="content"></div>
  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
```

### TODO
  * override render function to use something other than handlebars

