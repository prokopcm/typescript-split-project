import UserModel from "@/models/UserModel"

export async function sendEmails () {
  const u = new UserModel()
  console.log(u.name)
}