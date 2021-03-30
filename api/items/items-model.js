const db = require('../data/db-config')


const getAll = () => {
    return db('items')
}
const getById = (id) => {
    return db('items').where('item_id', id).first()
}
const createNewItem = async (item) => {
    const [id] = await db('items').returning('item_id').insert(item)
    return getById(id)
}
const updateItem = async (id, item) => {
    await db('items').where('item_id', id).returning('item_id').update(item)
    return getById(id)
}
const deleteItem = (id) => {
    return db('items').where('item_id',id).del()
}
module.exports = {
    getAll,
    getById,
    createNewItem,
    deleteItem,
    updateItem
    
}