const router = require('koa-router')()
const {
    list, init, get, create, update, del,
} = require('./api')

router.get('/api/:list', init, list)
router.get('/api/:list/:id', init, get)
router.post('/api/:list', init,create)
router.put('/api/:list/:id', init, update)
router.delete('/api/:list/:id', init, del)

module.exports = router.routes()