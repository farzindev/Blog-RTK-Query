// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.created = Date.now()
        req.body.updated = Date.now()
    }
    if (req.method === 'PUT') {
        req.body.updated = Date.now()
    }
    // Continue to JSON Server router
    next()
})

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})