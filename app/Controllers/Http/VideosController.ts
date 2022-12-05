import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Video from 'App/Models/Video'

export default class VideosController {
    public async create({request, response, auth}: HttpContextContract) {
        try{
            const RegisterValidator = schema.create({
                title: schema.string({}),
                description: schema.string({}, [rules.minLength(8)]),
                url: schema.string({})
            })
            const user = auth.user
            const userVideo = await request.validate({ schema: RegisterValidator })
            const userPayloader = await Video.create({userId: user!.id, title: userVideo.title, url: userVideo.url, description: userVideo.description })

            return response.status(200).send(userPayloader)
        }catch(err){
            console.error(err)
            return response.status(400).send({message: 'somenthign went wrong!'})
        }
    }

    public async index({response}: HttpContextContract) {
        try{
            const videos = await Video.all()
            return response.status(200).send(videos)
        }catch(err){
            console.error(err)
            return response.status(400).send({error: 'no video find'}) 
        }
    }

    public async search({response, params}: HttpContextContract) {
        const { id } = params
        try{
            const video = await Video.findOrFail(id)
            return response.status(200).send({
                title: video.title, 
                description: video.description,
                url: video.url
            })
        }catch(err){
            console.error(err)
            return response.status(400).send({error: 'no video find'}) 
        }
    }
}
