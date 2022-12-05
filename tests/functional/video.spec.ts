import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { tagsFacotry, UserFactory, videosFacotry } from 'Database/factories'

test.group('Videos', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('post videos', async ({client}) => {
    const user = await UserFactory.create();
    const video  = await videosFacotry.make();
    const response = await client.post('videos').json(video).loginAs(user);

    response.assertStatus(200);
  })

  test('get all videos', async ({client}) => {
    const user = await UserFactory.with('tags', 1).create();
    await user.load('tags');
    await videosFacotry.merge({userId:user.id, tagId: user.tags[0].id}).createMany(20);
    
    const response = await client.get('videos').loginAs(user);
    response.assertStatus(200);
  })

  test('get videos by id', async ({client}) => {
    const userPayloader = await UserFactory.create();
    const video = await tagsFacotry.with('videos', 1, (vid) => {vid.merge({userId: userPayloader.id})}).create();

    const response = await client.get(`videos/${video.videos[0].id}`).loginAs(userPayloader);
    console.log(video[0])
    response.assertStatus(200);
    response.assertBody({
      title: video.videos[0].title, 
      description: video.videos[0].description,
      url: video.videos[0].url
    });
  })
})
