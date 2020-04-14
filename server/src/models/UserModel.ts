import { lowerCase } from 'lodash'
import { BaseModel } from "@/models/BaseModel"

/** A model that represents a user in a system */
export default class UserModel extends BaseModel {
  /** The user's email address */
  email: string

  /** The name of the user */
  name: string

  constructor (name = 'Michael', email = 'test@example.com') {
    super()
    this.email = email
    this.name = name
  }

  toJSON () {
    return {
      email: lowerCase(this.email),
      name: this.name
    }
  }
}
