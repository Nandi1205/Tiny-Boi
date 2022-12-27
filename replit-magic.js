const server = require('express')()

server.all('/', (req, res) => {
  res.send('Hey')
})

module.exports = () => {
  server.listen(3000, () => {
    console.log('Server is ready.')
  })
}