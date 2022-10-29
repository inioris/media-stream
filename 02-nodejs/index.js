'use strict'

const express = require('express')

const User = require('./models/User')
const { createWriteStream } = require('fs')

const port = 3000
// Setup Express.js appx
const app = express()

app.get('/users', async (req, res) => {
  const data = await User.find()

  if (data.length) {
    for (let exportData = 0; exportData < data.length; exportData++) {
      const writeVisist = await createWriteStream(
        './02-nodejs/data-exports.csv',
        {
          flags: 'a'
        }
      )

      if (exportData === 0) {
        writeVisist.write(' NAME \t \t \t' + 'EMAIL \t \t \t \t \n')
      }

      writeVisist.write(
        data[exportData].name +
          '\t \t \t' +
          data[exportData].email +
          '\t \t \t \n'
      )
    }
  }

  res.send({
    account: data.length,
    user: data
  })
})

// app.post('/users', async (req, res) => {
//   const AMMOUNT = {
//     USERS: 100000
//   }
//
//   for (let insert = 0; AMMOUNT.USERS > insert; insert++) {
//     await User.insertMany({
//       name: faker.name.findName(),
//       email: faker.internet.email()
//     }).then(() => {
//       res.send({
//         user: 'Seed complete'
//       })
//     }, console.error.bind(console))
//   }
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
