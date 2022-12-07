import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VideoSchemaValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    url: schema.string(),
    title: schema.string([rules.minLength(4)]),
    description: schema.string([rules.minLength(4)]),
    tag_id: schema.number()
  })
  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
    'url.required': 'Url is required to sign up',
    'title.required': 'Title is required to sign up or does not meet the minimum length rule',
    'description.required': 'Description is required to sign up or does not meet the minimum length rule',
    'tag_id.required': 'tag_id is required to sign up',
  }

}