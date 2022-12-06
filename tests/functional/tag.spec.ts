import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner'
import { tagsFacotry, UserFactory } from 'Database/factories';

test.group('Tag', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('list tags', async ({client}) => {
    const user = await UserFactory.create();
    await tagsFacotry.createMany(30);

    const response = await client.get('tags').loginAs(user);

    response.assertStatus(200);
    response.hasBody();
  });

  test('search tags by title', async ({client}) => {
    const userPayloader = await UserFactory.create();
    const video = await tagsFacotry.with('videos', 30, (vid) => {vid.merge({userId: userPayloader.id})}).create();
    await tagsFacotry.createMany(30);

    const response = await client.get(`tags/${video.slug}/videos`).loginAs(userPayloader);

    response.assertStatus(200);
    response.hasBody();
  })

  test('create tag', async ({client}) => {
    const userPayloader = await UserFactory.create();
    const tag = await tagsFacotry.make();

    const response = await client.post(`tags`).json(tag).loginAs(userPayloader);

    response.assertStatus(200);
    response.hasBody();
  })
})
