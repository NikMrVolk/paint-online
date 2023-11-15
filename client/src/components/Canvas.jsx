import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import '../styles/canvas.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'

const Canvas = observer(() => {
	const canvasRef = useRef(null)
	const usernameRef = useRef()
	const [modal, setModal] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
	}, [])

	useEffect(() => {
		if (canvasState.username) {
			const socket = new WebSocket('ws://localhost:5005')
			canvasState.setSocket(socket)
			canvasState.setSessionId(id)
			toolState.setTool(new Brush(canvasRef.current, socket, id))
			socket.onopen = () => {
				console.log('Подключение установлено')
				socket.send(
					JSON.stringify({
						id,
						username: canvasState.username,
						method: 'connection',
					})
				)
			}
			socket.onmessage = (event) => {
				let msg = JSON.parse(event.data)
				// eslint-disable-next-line default-case
				switch (msg.method) {
					case 'connection':
						console.log(`пользователь ${msg.username} подключился`)
						break
					case 'draw':
						drawHandler(msg)
						break
				}
			}
		}
	}, [canvasState.username])

	const drawHandler = (msg) => {
		const figure = msg.figure
		const ctx = canvasRef.current.getContext('2d')
		console.log(figure)
		// eslint-disable-next-line default-case
		switch (figure.type) {
			case 'brush':
				Brush.draw(ctx, figure.x, figure.y)
				break
			case 'finish':
				ctx.beginPath()
				break
		}
	}

	const mouseDownHandler = () => {
		canvasState.pushToUndo(canvasRef.current.toDataURL())
	}

	const connectionHandler = () => {
		if (!usernameRef.current.value) return
		canvasState.setUsername(usernameRef.current.value)
		setModal(false)
	}

	return (
		<div className="canvas">
			<Modal show={modal} onHide={() => {}}>
				<Modal.Header closeButton>
					<Modal.Title>Enter your name</Modal.Title>
				</Modal.Header>
				<input ref={usernameRef} style={{ width: '50%', margin: '15px' }} />
				<Modal.Footer>
					<Button variant="secondary" onClick={connectionHandler}>
						Enter
					</Button>
				</Modal.Footer>
			</Modal>
			<canvas onMouseDown={() => mouseDownHandler()} width={600} height={400} ref={canvasRef} />
		</div>
	)
})

export default Canvas
