'use strict'
const Base = use('App/Validators/Base');

class User extends Base {

  get rules () {
    return {
      username:'required|min:5',
      email:'required|email|unique:users',
      password:'required|min:8'
    }
  }
  get validateAll () {
    return true
  }
  get messages(){
    return{
      'username.required':'Username is required',
      'username.min':'Username  should be at least 5 characters',
      'email.required':'Email is required',
      'email.email':'Email format not correct',
      'password.required':'Password is required',
      'password.min':'Password',
      'email.unique':'Email already exists'
    }
  }
  
}

module.exports = User
