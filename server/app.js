const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const path = require('path')
const static = require('koa-static')


const cors = require('./config/cors_config')
const passport=require('./middlewares/passport')

const index = require('./routes/index')
const api_users = require('./routes/api/user')
const api_scenerys = require('./routes/api/scenery')
const api_orders = require('./routes/api/order')

// 上传图片
app.use(static(
  path.join(__dirname, './public/images')//获取static文件夹下的资源
))

// error handler
onerror(app)

app.keys = ['this is my secret set'];

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  extended:false
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api_users.routes(), api_users.allowedMethods())
app.use(api_scenerys.routes(), api_scenerys.allowedMethods())
app.use(api_orders.routes(), api_orders.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
