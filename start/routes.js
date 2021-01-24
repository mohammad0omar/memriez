'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');
// Route.group(() => {
//     Route.get('/me', 'UserController.me')
//     Route.put('/update_profile', 'UserController.updateProfile')
    // Route.put('/change_password', 'UserController.changePassword');
// })
//     .prefix('account')
//     .middleware(['auth:jwt'])
Route.post('/signup', 'UserController.signup').validator('User');
Route.post('/login', 'UserController.login');
Route.get('/gift', 'GiftController.index').validator('Gift').middleware(['auth:jwt']);  
Route.get('/gift/:nfc_id', 'GiftController.show').validator('Gift').middleware(['auth:jwt']);  
Route.post('/gift', 'GiftController.store').validator('Gift').middleware(['auth:jwt']);   
Route.post('/uploadImage','FileController.upload_image').middleware(['auth:jwt']);  
Route.get('/card/type', 'CardTypeController.index').middleware(['auth:jwt']);

Route.group(() => {
  Route.post('/card/type', 'CardTypeController.store').middleware(['auth:jwt']);
  Route.post('/card', 'CardController.store').middleware(['auth:jwt']);  
  Route.post('/card/:gift_id', 'CardController.index').middleware(['auth:jwt']);  
}).prefix('gift')

Route.any('*', ({ view }) => view.render('welcome'))