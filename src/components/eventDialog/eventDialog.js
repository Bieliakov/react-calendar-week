import React, {useState, useEffect} from 'react';
import Dialog from '../common/modal/modal';
import UserSearch from '../common/userSearch/userSearch';

import './eventDialog.scss'
import {EventDataContext} from '../../context/EventDataProvider';

export default ({
	                isDialogOpened,
	                isEditing,
	                onCloseDialog,
	                onClickOk
                }) => {

	const [selectedUsers, setSelectedUsers] = useState([]);
	const [isUsersShown, setIsUsersShown] = useState(false);
	let {eventData} = React.useContext(EventDataContext);

	useEffect(() => {
		if (!isDialogOpened) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers([...eventData.guests]);
		}
	}, [isDialogOpened, eventData.guests]);

	const onClickOkHandler = () => {
		const dataForUpdate = {
			...eventData,
			guests: [...selectedUsers]
		};

		onClickOk(dataForUpdate, isEditing);
	};

	const onClickedInsideDialogHandler = () => {
		setIsUsersShown(false);
	};

	return (
		<>
			{eventData && eventData.date &&
			<Dialog isOpened={isDialogOpened}
			        closeDialog={onCloseDialog}
			        onClickOKCb={onClickOkHandler}
			        onClickedInsideDialog={onClickedInsideDialogHandler}
			        title={'Event details: '}
			>

				<div style={{ marginBottom: 20}}>
						<div>
							{eventData.date.fullDateObj.toDateString()}
						</div>
						<div>
							Time period: {eventData.start + ' - ' + eventData.end}
						</div>

				</div>

				<UserSearch isUsersShown={isUsersShown}
				            setIsUsersShown={setIsUsersShown}
				            selectedUsers={selectedUsers}
				            setSelectedUsers={setSelectedUsers} />
				<div>
					Invited: {selectedUsers.map((guest) => guest.username).join(', ')}
				</div>
			</Dialog>}
		</>
	)
}
