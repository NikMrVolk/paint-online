const express = require('express')
const app = express()
const WServer = require('express-ws')(app)

const PORT = process.env.PORT || 5005

app.ws('/', (ws, req) => {
	console.log('Подключение установлено')
})

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})

// app.get('/', (req, res) => {
// 	res.send('Hello World!')
// })
