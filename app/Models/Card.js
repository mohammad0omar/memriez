'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Card extends Model {
    type () {
        return this.belongsTo('App/Models/CardType')
      }
      gift () {
        return this.belongsTo('App/Models/Gift')
      }
}

module.exports = Card
