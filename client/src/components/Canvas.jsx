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
		toolState.setTool(new Brush(canvasRef.current))
	}, [])

	useEffect(() => {
		if (canvasState.username) {
			const socket = new WebSocket('ws://localhost:5005')
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
				console.log(event.data)
			}
		}
	}, [canvasState.username])

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
