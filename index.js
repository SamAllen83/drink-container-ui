
// express is our http server
const express = require('express')

//template engine integration for express
const mustacheExpress = require('mustache-express')

//logger
const morgan = require('morgan')

//static (built) assets hack
const manifest = require('express-manifest')

const path = require('path')
// const httpProxy = require('http-proxy').createProxyServer()
// const drinkContainerUi = 'http://localhost:3000'

const app = express()
const port = process.env.PORT || 3000

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')

//first, log the request
app.use(morgan('combined'))

// app.all("/static/*", function(req, res) {
//     console.log(`redirecting ${req.url} to drinkContainerUi`);
//     httpProxy.web(req, res, {target: drinkContainerUi});
// });

//map static assets to the actual built asset
app.use('/static', manifest({
    manifest: path.join(__dirname, 'build') + '/asset-manifest.json',
    prepend: path.join(__dirname, 'build'),
    reqPathFind: /^(\/?)/,
    reqPathReplace: '',
    debug: true
  }));

app.use('/css', express.static(path.join(__dirname, 'static/css')))
app.use('/images', express.static(path.join(__dirname, 'static/images')))
app.use('/scripts', express.static(path.join(__dirname, 'static/scripts')))

app.use('/static', express.static(path.join(__dirname, 'build/static')))

// render the views/home.mustache with the given context
app.get('/', (req, res) => res.render('home', { css: '/static/main.css', js: '/static/main.js' }))

//catchall for things live favicon.ico
app.use('/', express.static(path.join(__dirname, 'static')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    // console.log(process.env)
})
