import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeUpdate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Video from './Video'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public title: string

  @column()
  public userId: number
  
  @column()
  public slug: string

  @beforeCreate()
  private static async slugMethod(tag:Tag) {
    tag.slug = tag.title.replace(/[^a-zA-Z-s]/g, "").toLowerCase();
  }

  @beforeUpdate()
  private static async slugMethodUpdate(tag:Tag) {
    tag.slug = tag.title.replace(/[^a-zA-Z-s]/g, "").toLowerCase();
  }

  @hasMany(() => Video)
  public videos: HasMany<typeof Video>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
