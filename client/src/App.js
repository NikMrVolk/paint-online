import MainPage from './components/MainPage'
import './styles/app.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Routes>
					<Route path="/:id" element={<MainPage />}></Route>
					<Route path="/" element={<Navigate to={`f${(+new Date()).toString(16)}`} />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
