'use strict'
const Base = use('App/Validators/Base');

class Gift extends Base {
  get rules () {
    return {
      nfc_id:'unique:gifts|min:5',
      name:'min:3',
      password:'min:8'
    }
  }
  get validateAll () {
    return true
  }
  get messages(){
    return{
      'nfc_id.required':'NFC id is required',
      'nfc_id.min':'NFC Id is not correct',
      'name.min':'Email is required',
      'password.min':'Password'
    }
}
}

module.exports = Gift
