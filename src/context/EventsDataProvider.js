import React, { useState } from 'react';

export const EventsDataContext = React.createContext({
	events: [],
	setEvents: () => {}
});

export const EventsDataProvider = ({children}) => {
	const [ events, setEvents ] = useState([]);

	const value = { events, setEvents };

	return (
		<EventsDataContext.Provider value={value}>
			{children}
		</EventsDataContext.Provider>
	);
};
