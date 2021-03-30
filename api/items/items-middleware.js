const Item = require('./items-model')

const checkItem = (req,res,next) => {
    if(!req.body.item_name || !req.body.item_price)
        res.status(401).json({message:'Item name and item price is required!'})
    else if (typeof req.body.item_price != 'number')
            res.status(401).json({message:'Item price must be a number'})
    else
        next()
}
const checkItemExists = (req,res,next) => {
    Item.getById(req.params.id)
    .then((item) => {
        if(!item)
            res.status(404).json({message:`Item with id ${req.params.id} not found`})
        else
        next()
    })
    .catch(err => next(err))
}

module.exports = {
    checkItem,
    checkItemExists
}