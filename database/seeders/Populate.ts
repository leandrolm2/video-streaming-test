import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { tagsFacotry, UserFactory } from 'Database/factories';

export default class extends BaseSeeder {
  public async run () {
    for (let i = 0; i > 30;i++) {
      const userPayloader = await UserFactory.merge({password:'user12345'}).create();
      await tagsFacotry.with('videos', 20, (vid) => {vid.merge({userId: userPayloader.id})}).create();
    }
  }
}
