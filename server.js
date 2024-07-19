const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Настройка правил для аутентификации
const rules = auth.rewriter({
  users: 600,
  posts: 644
})

// Настройка сервера
server.db = router.db
server.use(middlewares)
server.use(rules)
server.use(auth)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
