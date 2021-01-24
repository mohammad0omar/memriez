'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gift extends Model {

    user() {
        return this.belongsTo('App/Models/User')
      }

    cards() {
      return this.hasMany('App/Models/Card','id','gift_id');
    }
      
}

module.exports = Gift
