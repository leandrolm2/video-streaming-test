import Factory from '@ioc:Adonis/Lucid/Factory'
import Tag from 'App/Models/Tag';
import User from 'App/Models/User'
import Video from 'App/Models/Video'

export const UserFactory = Factory.define(User, async ({ faker }) => {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
}).relation('videos', () => videosFacotry).relation('tags', () => tagsFacotry).build()

export const videosFacotry = Factory.define(Video, async ({faker}) => {
    return {
        title: faker.name.jobTitle(),
        url: faker.internet.url(),
        description: faker.name.jobTitle()
    }
}).build()

export const tagsFacotry = Factory.define(Tag, async ({faker}) => {
    return {
        title: faker.name.jobTitle()
    }
}).relation('videos', () => videosFacotry).build();