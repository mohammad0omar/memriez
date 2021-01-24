'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.string('link', 60).notNullable()
      table.integer('card_type_id').unsigned().references('id').inTable('card_types')
      table.integer('gift_id').unsigned().references('id').inTable('gifts')
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardSchema
