const express = require('express')
const request = require('request')

const app = express()

const path = require('path')

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*')
   next()
})

app.get('/rps/history', (req, res) => {
   request({ url: 'https://bad-api-assignment.reaktor.com/rps/history' }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
         return res.status(500).json({ type: 'error', message: error.message })
      }

      res.json(JSON.parse(body))
   })
})

if (process.env.NODE_ENV === 'production') {
   app.use(express.static())
   app.get('*', (req, res) => {
      req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
   })
}

const PORT = process.env.PORT || 3003
app.listen(PORT, (err) => {
   if (err) return console.log(err)
   console.log(`listening on ${PORT}`)
})
