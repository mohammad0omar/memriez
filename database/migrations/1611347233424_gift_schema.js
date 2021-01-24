'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GiftsSchema extends Schema {
  up () {
    this.create('gifts', (table) => {
      table.increments()
      table.string('nfc_id', 254).notNullable().unique()
      table.string('password', 60).nullable()
      table.string('Name', 60).nullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('gifts')
  }
}

module.exports = GiftsSchema
