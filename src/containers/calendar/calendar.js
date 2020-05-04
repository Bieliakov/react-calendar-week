import React, { useState, useEffect, useContext, useRef } from 'react';

import CalendarHead from '../../components/calendar/calendarHead/calendarHead'
import CalendarTable from '../../components/calendar/calendarTable/calendarTable';
import CalendarTime from '../../components/calendar/calendarTime/calendarTime';

import EventDialog from '../../components/eventDialog/eventDialog';

import { EventDataContext } from '../../context/EventDataProvider';
import { EventsDataContext } from '../../context/EventsDataProvider';
import './calendar.scss';

const sectionHeight = 35;
const timeStep = 0.5;
const timeSectionWidth = 50;
const columnWidth = 100;

export default () => {
	let {updateEventData} = React.useContext(EventDataContext);
	let {events, setEvents} = useContext(EventsDataContext);

	const tableRef = useRef();

	const [scrollToTableTop, setScrollToTableTop] = useState(0);
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const rows = getRowsBasedOnTimestep(timeStep);
	const cols = getColumns();

	useEffect(() => {
		// example event
		setEvents([
			{
				date: {
					...cols[2]
				},
				end: 4,
				start: 1,
				guests: [],
				id: Math.random()
			}
		])
	}, []);

	const onSelectedHandler = (arrayOfCells, colNumber) => {
		const date = cols.find(col => col.value === colNumber);

		let startRow = 0;
		let endRow = 0;

		const firstCellRowNumber = arrayOfCells[0].rowNumber;
		const lastCellRowNumber = arrayOfCells[arrayOfCells.length - 1].rowNumber;

		if (firstCellRowNumber > lastCellRowNumber) {
			endRow = firstCellRowNumber;
			startRow = lastCellRowNumber;
		} else {
			endRow = lastCellRowNumber;
			startRow = firstCellRowNumber;
		}

		updateEventData({
			date,
			start: startRow,
			// end + timestep because this time is included after selection
			end: endRow + timeStep,
			guests: []
		});
		setIsDialogOpened(true);
	};

	const onCloseDialog = () => {
		setIsEditing(false);
		setIsDialogOpened(false);
	};

	const onClickOkHandler = (dataForUpdate, isEventEditing) => {
		if (isEventEditing) {
			setEvents([
				...events.map((event) => {
					if (event.id === dataForUpdate.id) {
						return { ...dataForUpdate };
					}

					return event;
				})
			]);
		} else {
			setEvents([
				...events,
				{
					...dataForUpdate,
					id: Math.random()
				}
			]);
		}

		onCloseDialog();
	};

	const onEditEventHandler = (eventData) => {
		updateEventData(eventData);
		setIsDialogOpened(true);
		setIsEditing(true);
	};

	// update scroll distance to top only when user has stopped scrolling
	let updateScrollToTableTop = function () {
		setScrollToTableTop(tableRef.current.scrollTop);
	};

	let scrollTimerFunction;

	const onScrollHandler = () => {
		clearTimeout(scrollTimerFunction);
		scrollTimerFunction = setTimeout( updateScrollToTableTop , 50 );
	};

	return (
		<div className='calendar'>
			<CalendarHead cols={cols} timeSectionWidth={timeSectionWidth} columnWidth={columnWidth}/>
			<div className='calendarTable' onScroll={onScrollHandler} ref={tableRef}>
				<CalendarTime className='calendarTable--time'
				                sectionHeight={sectionHeight * 2}
				                rows={rows} />
				<CalendarTable className='calendarTable--table'
												rows={rows}
                        cols={cols}
                        selectedHandler={onSelectedHandler}
				                timeSectionWidth={timeSectionWidth}
				                sectionHeight={sectionHeight}
				                columnWidth={columnWidth}
				                timeStep={timeStep}
				                onEditEvent={onEditEventHandler}
				                scrollToTableTop={scrollToTableTop}/>
			</div>

			<EventDialog isEditing={isEditing}
			             isDialogOpened={isDialogOpened}
			             onCloseDialog={onCloseDialog}
			             onClickOk={onClickOkHandler}
			/>

		</div>
	);
};

// these functions might be moved to utils
function getWeekDays() {
	let curr = new Date();
	let week = [];

	for (let i = 0; i <= 6; i++) {
		let first = curr.getDate() - curr.getDay() + i;
		let day = new Date(curr.setDate(first));
		week.push(day)
	}

	return week;
}

function getColumns() {
	return getWeekDays().map(date => {
		return {
			value: date.getDate(),
			day: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear(),
			fullDateObj: date,
			shortDayLabel: date.toString().split(' ')[0]
		}
	});
}

function getRowsBasedOnTimestep(timeStep) {
	let rows = [];
	for (let i = 0; i < 24; i = i + timeStep) {
		rows.push(i);
	}

	return rows;
}
