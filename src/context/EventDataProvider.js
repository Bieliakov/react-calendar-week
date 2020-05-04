import React, { useState } from 'react';

export const EventDataContext = React.createContext({
	eventData: {},
	updateEventData: () => {}
});

export const EventDataProvider = ({children}) => {
	const [ eventData, updateEventData ] = useState({});

	const value = { eventData, updateEventData };

	return (
			<EventDataContext.Provider value={value}>
				{children}
			</EventDataContext.Provider>
	);
};
