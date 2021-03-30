const { clean } = require('knex-cleaner')
const bcryptjs = require('bcryptjs')
const hash = bcryptjs.hashSync('password', 8)
exports.seed = async function(knex) {

  await clean(knex, {
    mode: 'truncate',
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  })
  await knex('users').insert(
    {
      user_username: 'admin',
      user_password: hash, // password "1234"
      user_email: 'admin@gmail.com',
      user_role: true
    }
 )
 await knex('items').insert([
  {
    item_name:'TV',
    item_price: 150.41,
    item_description:'4k HD OLED HIGH-DEF SUPER ULTRA TV'
  },
  {
    item_name:'Remote',
    item_price: 150.41,
    item_description:"Why does this cost the same as a TV? Climate change."
  },
  {
    item_name:'Camera',
    item_price: 1200.99,
    item_description:"Why would you buy a camera when you have a smartphone?"
  },
  {
    item_name:'Smartphone',
    item_price: 2200.99,
    item_description:"Why would you buy a smartphone when you have a camera?"
  }
 ]
 )
}
