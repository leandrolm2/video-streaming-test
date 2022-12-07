/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//user
Route.post('/users', 'UsersController.store');
Route.post('/login', 'UsersController.login');

//videos
Route.group(() => {
    Route.post('/videos', 'VideosController.store')
    Route.get('/videos', 'VideosController.index')
    Route.get('/videos/:id', 'VideosController.show')
    Route.put('/videos/:id', 'VideosController.update')
    Route.delete('/videos/:id', 'VideosController.destroy')

}).middleware(['auth'])

//tags
Route.group(() => {
    Route.get('/tags', 'TagsController.index')
    Route.get('/tags/:title_tag/videos', 'TagsController.show')
    Route.post('/tags', 'TagsController.store')
    Route.put('/tags/:id', 'TagsController.update')
    Route.delete('/tags/:id', 'TagsController.destroy')
    
}).middleware(['auth'])
