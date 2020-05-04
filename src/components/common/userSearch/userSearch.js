import React, {useState, useEffect} from 'react';
import './userSearch.scss';

const usersURL = 'https://jsonplaceholder.typicode.com/users';

export default (props) => {

	const {
		selectedUsers,
		setSelectedUsers,
		setIsUsersShown,
		isUsersShown
	} = props;

	const [userQuery, setUserQuery] = useState('');
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		fetch(usersURL, { signal })
			.then(response => response.json())
			.catch((error) => {
				console.log('error', error);
				setUsersList([])
			})
			.then(users => setUsersList(users));

		return function cleanup() {
			abortController.abort();
		}
	}, []);

	const onFocusHandler = () => {
		setIsUsersShown(true);
	};

	const onSelectUserHandler = (user) => {
		setSelectedUsers((currentUsers) => [
			...currentUsers,
			user
		]);
		setIsUsersShown(false);
	};

	let usersDropdown = null;

	if (isUsersShown) {
		usersDropdown = (
			<div className='userSearch--select'>
				{usersList
					.filter(user => selectedUsers.every((selectedUser => selectedUser.username !== user.username )))
					.map((user) => {
					if (!user.username.includes(userQuery)) {
						return null;
					}

					return (
						<div onClick={() => onSelectUserHandler(user)} className='userSearch--select__option' key={user.username} value={user.username}>
							{user.username}
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className='userSearch'>
			<div className="userSearch--searchRow">
				<label htmlFor='userSearch--input' className='userSearch--label'>
					User search
				</label>
					<input
						autoComplete="off"
						name='userSearch--input'
						className='userSearch--input'
						onFocus={onFocusHandler}
						onClick={(evt) => evt.stopPropagation()}
						value={userQuery}
						onChange={(event) => setUserQuery(event.target.value)}/>
				{usersDropdown}
			</div>
		</div>
	)
}
