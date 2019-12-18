module.exports = {
  app: {
    host: 'localhost',
    port: '3000',
  },
  db: {
    mongodb: {
      mongooseOptions: {
        dbName: 'db',
        user: 'user',
        pass: 'pass',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
  cors: {
    origin: [/localhost/],
    credentials: true,
  },
  session: {
    secret: 'defaultsecret',
    cookie: {},
    proxy: true,
  },
  graphiql: {
    enabled: true,
  },
  jwt: {
    secret: 'defaultsecret',
    refresh:"REFRESH_TOKEN_SECRET"
  },
}
