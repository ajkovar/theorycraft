let app = require('tc/lib/server')

const port = Number(process.env.PORT || 5000)

app.listen(port, () => {
  console.log('tc started on', port)
})
