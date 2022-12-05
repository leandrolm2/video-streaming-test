import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Tag from './Tag'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tagId: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public url: string

  @column()
  public description: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
