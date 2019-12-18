import { createServer } from 'http'

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Socket from 'socket.io'

import pool, { initDb } from './postgres-connect'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 3000
const server = createServer(app)
server.listen(port)
initDb()

const io = Socket(server)
io.on('connection', (socket) => {
  socket.on('user', async (data, cb) => {
    const { nationalId } = data
    const results = await pool.query('SELECT * FROM users WHERE national_id = $1', [nationalId])
    if (results.rowCount === 1) {
      const [user] = results.rows
      pool.query('INSERT INTO logs(user_id, status) VALUES($1, $2)', [user.id, 'read id card'])
      cb(null, { user })
    } else {
      cb('ไม่พบข้อมูลในระบบ')
    }
  })
  socket.on('checkin', async (data, cb) => {
    const { userId } = data
    const result = await pool.query('UPDATE users SET status = $1 WHERE status = $2 AND id = $3', ['checkedin', 'register', userId])
    pool.query('INSERT INTO logs(user_id, status) VALUES($1, $2)', [userId, 'checkedin'])
    if (result.rowCount === 1) {
      cb(null, { message: 'ลงทะเบียนเข้าร่วมงานเรียบร้อย' })
    } else {
      cb('คุณได้ลงทะเบียนเข้าร่วมงานไปแล้ว')
    }
  })
})

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  console.info(`Listening on ${bind}`)
}
server.on('error', onError)
server.on('listening', onListening)
