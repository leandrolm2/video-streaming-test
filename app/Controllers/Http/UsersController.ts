import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
export default class UsersController {
    public async register({request, response}:HttpContextContract) {
        try{
            const RegisterValidator = schema.create({
                email: schema.string({}),
                password: schema.string({}, [rules.minLength(8)]),
                name: schema.string({})
            })
            const user = await request.validate({ schema: RegisterValidator })

            const userPayloader = await User.create(user)

            return response.status(200).send({
                email: userPayloader.email,
                name: userPayloader.name
            })
        }catch(err){
            console.error(err)
            return response.status(400).send({message: 'somenthign went wrong!'})
        }
    }

    public async login({request, response, auth}:HttpContextContract) {
        const { email, password } = request.body()
        
        try {
            const token = await auth.use('api').attempt(email, password, {expiresIn: '2 hours'})
            return response.status(200).send({ type: token.type, token: token.token})
          } catch (error) {
            console.error(error)
            return response.status(500).send({ error: true, msg: error.msg })
          }
    }
}
