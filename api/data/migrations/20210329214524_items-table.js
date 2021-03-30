
exports.up = function(knex) {
    return knex.schema
  .createTable('items', (tbl) => {
    tbl.increments('item_id')
    tbl.string('item_name', 200).notNullable()
    tbl.text('item_description')
    tbl.float('item_price').notNullable()
  })
};

exports.down = function(knex) {
   return knex.schema
  .dropTableIfExists('items')

};
