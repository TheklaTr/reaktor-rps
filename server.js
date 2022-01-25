const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}

const domainsFromEnv = process.env.CORS_DOMAINS || ''
const whitelist = domainsFromEnv.split(',').map((item) => item.trim())

const corsOptions = {
   origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
         callback(null, true)
      } else {
         callback(new Error('Not allowed by CORS'))
      }
   },

   credentials: true,
}

app.use(cors(corsOptions))

app.listen(PORT, (err) => {
   if (err) return console.log(err)
   console.log(`listening on ${PORT}`)
})
