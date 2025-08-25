import React from 'react';
import { Block } from './Block';
import './index.scss';

// 1:30:00

function App() {
	const [rates, setRates] = React.useState({});
	const [fromCurrency, setFromCurrency] = React.useState('RUB');
	const [toCurrency, setToCurrency] = React.useState('USD');
	const [fromPrice, setFromPrice] = React.useState(0);
	const [toPrice, setToPrice] = React.useState(0);

	React.useEffect(() => {
		// мені нада згрупувати ці всі данні в один обʼєкт
		// fetch('-----')
		fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20191021&json')
			.then(res => res.json())
			.then(json => {
				setRates(
					json.reduce((acc, el) => {
						acc[el.cc] = el.rate;
						return acc;
					}, {}),
				);
			})
			.catch(error => {
				console.log(error);
				alert('Помилка доступу до данних');
			});
		console.log(rates);
	}, []);

	// const onChangeFromCurrency = cur => {
	// 	setFromCurrency(cur);
	// 	onChangeFromPrice(fromPrice);
	// };

	React.useEffect(() => {
		onChangeFromPrice(fromPrice);
	}, [fromCurrency]);

	React.useEffect(() => {
		onChangeToPrice(toPrice);
	}, [toCurrency]);

	const onChangeFromPrice = value => {
		// const price = value / rates[fromCurrency];
		// const result = price * rates[toCurrency];
		const price = value / rates[toCurrency];
		const result = price * rates[fromCurrency];
		setFromPrice(value);
		setToPrice(result);
	};

	const onChangeToPrice = value => {
		// const result = (rates[fromCurrency] / rates[toCurrency]) * value;
		const result = (rates[toCurrency] / rates[fromCurrency]) * value;
		setFromPrice(result);
		setToPrice(value);
	};

	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				// onChangeCurrency={onChangeFromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	);
}

export default App;
