// import library
const { createServer } = require('http') 
const bodyParser = require('body-parser')
const compression = require('compression')
const config =  require('config')
const ConnectRedis = require('connect-redis')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express') 
const flash = require('express-flash')
const passport = require('passport')
const redis = require('redis')
const session = require('express-session')
const { initDb } = require('./postgres-connect')


const RedisStore = new ConnectRedis(session)
const redisClient = redis.createClient(config.get('db.redis.uri'))

//connect postgresql
initDb()

const app = express()

app.set('trust proxy', 1)
app.use(compression()) 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })) //
app.use(bodyParser.json({ limit: '50mb' })) //

app.use(cookieParser())
app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: config.get('session.secret'),
  cookie: config.get('session.cookie'),
  proxy: config.get('session.proxy'),
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(cors())

app.get('/test',(req,res) => {
  res.send('API SCHOOL SRUNNING!!')
})

app.use(require('./router/router'))

const server = createServer(app)

const port = config.get('app.port')
server.listen({ port }, () => {
  console.log(`Server running on port: ${port}`)
})


