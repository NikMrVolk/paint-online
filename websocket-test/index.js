const btn = document.getElementById('btn')
const socket = new WebSocket('ws://localhost:5005/')

socket.onopen = () => {
	console.log('Соединение установлено')
}
