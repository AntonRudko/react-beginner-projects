import './index.scss'

import React from 'react'

const questions = [
	{
		title: 'React - это ... ?',
		variants: ['библиотека', 'фреймворк', 'приложение'],
		correct: 0,
	},
	{
		title: 'Компонент - это ... ',
		variants: [
			'приложение',
			'часть приложения или страницы',
			'то, что я не знаю что такое',
		],
		correct: 1,
	},
	{
		title: 'Что такое JSX?',
		variants: [
			'Это простой HTML',
			'Это функция',
			'Это тот же HTML, но с возможностью выполнять JS-код',
		],
		correct: 2,
	},
	{
		title: 'Что такое useState?',
		variants: [
			'Это функция для хранения данных компонента',
			'Это глобальный стейт',
			'Это когда на ты никому не нужен',
		],
		correct: 0,
	},
]

function Result(props) {
	return (
		<div className='result'>
			<img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
			<h2>
				Вы отгадали ответа {props.correct} из {questions.length}
			</h2>
			<button onClick={props.onClickRestart}>Попробовать снова</button>
		</div>
	)
}

function Game({ step, title, variants, correct, onClickVariant }) {
	const percentage = Math.round((step * 100) / questions.length)
	console.log(percentage)

	return (
		<>
			<div className='progress'>
				<div
					style={{ width: `${percentage}%` }}
					className='progress__inner'
				></div>
			</div>
			<h1>{title}</h1>
			<ul>
				{variants.map((item, index) => (
					<li
						key={index}
						onClick={() => {
							onClickVariant(index)
						}}
					>
						{item}
					</li>
				))}
			</ul>
		</>
	)
}

function App() {
	const [step, setStep] = React.useState(0)
	// N - правильних відповідей
	const [correct, setCorrect] = React.useState(0)
	const question = questions[step]

	const onClickVariant = index => {
		console.log('Питання : ' + (step + 1))
		console.log('Ваша відповідь : ' + index)
		if (index === question.correct) {
			setCorrect(prev => prev + 1)
		}
		setStep(prev => prev + 1)
	}
	const onClickRestart = () => {
		setStep(0)
    setCorrect(0)
	}

	return (
		<div className='App'>
			{step !== questions.length ? (
				<Game step={step} {...question} onClickVariant={onClickVariant} />
			) : (
				<Result correct={correct} onClickRestart={onClickRestart} />
			)}
		</div>
	)
}

export default App
