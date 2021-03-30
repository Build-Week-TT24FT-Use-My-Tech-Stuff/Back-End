const db = require('../data/db-config')



const getUserByUsername = (username) => {
    return db('users').where('user_username', username).first()

}
const addUser = (user) => {
return db('users').returning(['user_username', 'user_email']).insert(user)
} 

module.exports = {
    getUserByUsername,
    addUser,
    
}