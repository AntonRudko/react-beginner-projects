import './index.scss'
import React from 'react'

function App() {
	const [count, setCount] = React.useState(0)

	const onClickPlus = () => {
		setCount(prev => prev + 1)
		console.log(count)
	}
	const onClicMinus = () => {
		setCount(prev => prev - 1)
		console.log(count)
	}

	return (
		<div className='App'>
			<div>
				<h2>Счетчик:</h2>
				<h1>{count}</h1>
				<button className='minus' onClick={onClicMinus}>
					- Минус
				</button>
				<button className='plus' onClick={onClickPlus}>
					Плюс +
				</button>
			</div>
		</div>
	)
}

export default App
