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
}
