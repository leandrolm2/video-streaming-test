import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
    public async index({response}:HttpContextContract) {
        try{
            const tags = await Tag.all()
            if(tags.length < 0) return response.send('There is no tag register on database');

            return response.status(200).send(tags)
        }catch(err) {
            console.error(err)
            return response.status(400).send({error:true, message:'something went wrong'})
        }
    }

    public async search({params, response}:HttpContextContract) {
        const { title_tag } = params;
        const title = title_tag.replace(/[^a-zA-Z-s]/g, "").toLowerCase();
        try{
            const videosFromTag = await Tag.query().where('slug', title).preload('videos')
            if(videosFromTag.length < 0) return response.send('There is no video related to that tag on database');
            
            return response.status(200).send(videosFromTag[0].videos);
        }catch(err){
            console.error(err)
            return response.status(400).send({error:true, message:'something went wrong'})
        }
    }

    public async create({response, request, auth}:HttpContextContract) {
        const {title} = request.body()
        
        if (title.lenght > 360) return response.status(403).send({error: true, message: 'title too long'})

        try{
            const tags = await Tag.create({title:title, userId: auth!.user!.id})

            return response.status(200).send(tags)
        }catch(err) {
            console.error(err)
            return response.status(400).send({error:true, message:'something went wrong'})
        }
    }

    public async update({response, request, params}:HttpContextContract) {
        const updateTag = request.body()
        const tagId = params
        if (updateTag.title.lenght > 360) return response.status(403).send({error: true, message: 'title too long'})
        
        try{
            const tag = await Tag.findOrFail(tagId.id);
            await tag.merge({title: updateTag.title}).save()

            return response.status(200).send(tag)
        }catch(err) {
            console.error(err)
            return response.status(400).send({error:true, message:'something went wrong'})
        }
    }

    public async delete({response, params}: HttpContextContract) {
        const { id } = params

        try{
            const tag = await Tag.findOrFail(id);
            await tag.delete();

            return response.status(200).send({
                deleted: tag.$isDeleted, 
                message: `tag from ${tag.id} was deleted`
            })
        }catch(err){
            console.error(err)
            return response.status(400).send({error: 'somenthing went wrong'}) 
        }
    }
}
