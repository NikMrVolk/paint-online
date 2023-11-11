import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import Circle from '../tools/Circle'
import Rect from '../tools/Rect'

const Toolbar = () => {
	return (
		<div className="toolbar">
			<div className="toolbar__elements">
				<button
					className="toolbar__btn brush"
					onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
				></button>
				<button
					className="toolbar__btn rect"
					onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
				></button>
				<button
					className="toolbar__btn circle"
					onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
				></button>
				<button className="toolbar__btn eraser"></button>
				<button className="toolbar__btn line"></button>
				<input type="color" />
			</div>
			<div className="toolbar__elements">
				<button className="toolbar__btn undo"></button>
				<button className="toolbar__btn redo"></button>
				<button className="toolbar__btn save"></button>
			</div>
		</div>
	)
}

export default Toolbar