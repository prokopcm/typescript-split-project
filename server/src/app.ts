import 'module-alias/register'

import * as express from 'express'
import UserModel from '@/models/UserModel'

const app = express()
const port = 3000

/**
 * Route that gets a JSONized user by their name
 */
app.get('/:name', (req, res) => {
  const user = new UserModel(req.params.name)

  res.status(200)
  res.json(user.toJSON())
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))