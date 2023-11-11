import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import '../styles/canvas.scss'

const Canvas = observer(() => {
	const canvasRef = useRef(null)

	useEffect(() => {
		canvasState.setCanvas(canvasRef.current)
		toolState.setTool(new Brush(canvasRef.current))
	}, [])

	return (
		<div className="canvas">
			<canvas width={600} height={400} ref={canvasRef} />
		</div>
	)
})

export default Canvas
