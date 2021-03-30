const router = require('express').Router()
const Item = require('./items-model')
const itemMiddleware = require('./items-middleware')
const {restricted} = require('../users/users-middleware')

router.get('/', (req,res,next) => {
    Item.getAll().then((items) => {
        res.json(items)
    })
    .catch(next)
})

router.post('/item', restricted,itemMiddleware.checkItem,(req,res,next) => {
    Item.createNewItem(req.body)
    .then((item) => {
        res.status(201).json(item)
    })
    .catch(next)

})

router.put('/item/:id', restricted ,itemMiddleware.checkItemExists, itemMiddleware.checkItem, (req,res,next) => {
    Item.updateItem(req.params.id, req.body)
    .then((item) => {
        res.status(201).json(item)
    })
    .catch(next)
})
router.delete('/item/:id', restricted,itemMiddleware.checkItemExists,(req,res,next) => {
    Item.deleteItem(req.params.id).then(() => {
        res.status(200).json({message:`item with id ${req.params.id} has been deleted`})
    })
    .catch(next)
})
// get item by id
// router.get('/:id', (req,res,next) => {

// })

module.exports = router