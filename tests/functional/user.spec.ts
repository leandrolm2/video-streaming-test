import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

test.group('Users', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('register user', async ({client}) => {
    const user =  await UserFactory.make()

    const response = await client.post('users').json({email: user.email, password: user.password, name: user.name});
    // response.assertStatus(200);
    response.assertBody({email: user.email, name: user.name});
  })

  test('login user', async ({client}) => {
    const user = await User.create({email: 'user@mail.com', password: '123', name: 'user'})
    
    const response = await client.post('login').json({email: user.email, password:'123'})
  
    response.assertStatus(200)
  })
})
