import UserModel from "@server/models/UserModel"

export async function sendEmails () {
  const u = new UserModel()

  console.log(u.toJSON().email)
}