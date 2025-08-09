import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'
import axios from 'axios'

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = React.useState([])
	const [isLoading, setIsloading] = React.useState(true)
	const [searchValue, setSearchValue] = React.useState('')
	const [invites, setInvites] = React.useState([3, 1])
	const [success, setSuccess] = React.useState(false)

	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://68975bf5250b078c2041b0cb.mockapi.io/users'
				)
				// console.log(data)
				setUsers(data)
				setIsloading(false)
			} catch (error) {
				alert('Помилка запиту на сервер')
				console.error(error)
			}
		})()
	}, [])

	const onChangeSearchValue = event => {
		setSearchValue(event.target.value)
	}

	const onClickInvite = id => {
		if (invites.includes(id)) {
			setInvites(prev => prev.filter(_id => _id !== id))
		} else {
			setInvites(prev => [...prev, id])
		}
	}
	const onClickSuccess = () => {
		invites.length == 0 ? setSuccess(false) : setSuccess(!success)
	}

	return (
		<div className='App'>
			{success ? (
				<Success count={invites.length} onClickSuccess={onClickSuccess} />
			) : (
				<Users
					items={users}
					isLoading={isLoading}
					searchValue={searchValue}
					onChangeSearchValue={onChangeSearchValue}
					invites={invites}
					onClickInvite={onClickInvite}
					onClickSuccess={onClickSuccess}
				/>
			)}
		</div>
	)
}

export default App
