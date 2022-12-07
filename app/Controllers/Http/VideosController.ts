import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import VideoSchemaValidator from 'App/Validators/Videos/StoreSchemaValidator'
import UpdateVideoSchemaValidator from 'App/Validators/Videos/UpdateSchemaValidator'

export default class VideosController {
    public async store({request, response, auth}: HttpContextContract) {
        const body = await request.validate(VideoSchemaValidator)
        
        try{
            const user = auth.user;
            const userPayloader = await Video.create({
                userId: user!.id, 
                title: body.title, 
                url: body.url, 
                description: body.description, 
                tagId: body.tag_id
            })

            return response.status(201).send(userPayloader);
        }catch(err){
            console.error(err);
            return response.status(500).send({message: 'somenthign went wrong!'});
        }
    }

    public async index({response}: HttpContextContract) {
        try{
            const videos = await Video.all()
            return response.status(200).send(videos)
        }catch(err){
            console.error(err)
            return response.status(500).send({error: 'something went wrong'}) 
        }
    }

    public async show({response, params}: HttpContextContract) {
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
            return response.status(500).send({error: 'something went wrong'}) 
        }
    }

    public async update({response, params, request}: HttpContextContract) {
        const { id } = params

        const newVideo = await request.validate(UpdateVideoSchemaValidator)
        try{
            const video = await Video.query().where('id', id)
            await video[0].merge(newVideo).save()

            return response.status(200).send({
                title: video[0].title, 
                description: video[0].description,
                url: video[0].url
            })
        }catch(err){
            console.error(err)
            return response.status(500).send({error: 'something went wrong'}) 
        }
    }

    public async destroy({response, params}: HttpContextContract) {
        const { id } = params

        try{
            const video = await Video.findOrFail(id);
            await video.delete();

            return response.status(200).send({
                deleted: video.$isDeleted, 
                message: `video from id ${id} was deleted`
            })
        }catch(err){
            console.error(err)
            return response.status(500).send({error: 'somenthing went wrong'}) 
        }
    }
}
