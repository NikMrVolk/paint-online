const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5005

app.ws('/', (ws, req) => {
	console.log('Подключение установлено')
	ws.on('message', (msg) => {
		msg = JSON.parse(msg)
		switch (msg.method) {
			case 'connection':
				connectionHandler(ws, msg)
				break
			case 'draw':
				broadcastConnection(ws, msg)
				break
		}
	})
})

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})

const connectionHandler = (ws, msg) => {
	ws.id = msg.id
	broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
	aWss.clients.forEach((client) => {
		if (client.id === msg.id) {
			client.send(JSON.stringify(msg))
		}
	})
}
