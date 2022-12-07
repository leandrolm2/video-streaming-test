import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateVideoSchemaValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    url: schema.string.optional(),
    title: schema.string.optional([rules.minLength(4)]),
    description: schema.string.optional([rules.minLength(4)]),
  })
  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    }
  }

}