'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardTypeSchema extends Schema {
  up () {
    this.create('card_types', (table) => {
      table.increments()
      table.string('type', 60).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('card_types')
  }
}

module.exports = CardTypeSchema
