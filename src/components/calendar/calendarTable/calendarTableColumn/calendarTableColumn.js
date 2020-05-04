import React from 'react';
import TableCell from './tableCell/tableCell';
import './calendarTableColumn.scss'

export default (props) => {
	const {
		col,
		rows,
		sectionHeight,
		columnEvents,
		isFirstColumn,
		columnWidth,
		timeStep,
		onEditEvent,
		selectedCells
	} = props;

	const onEditHandler = (clickEvent, event) => {
		clickEvent.stopPropagation();

		onEditEvent(event);
	};

	const eventElements = columnEvents.map((event) => {
		const height = (event.end - event.start) * sectionHeight / timeStep;
		const top = event.start * sectionHeight / timeStep;

		const doubleGap = 8;
		const eventStyles = {
			left: 0,
			top: top,
			height: height - doubleGap,
			width: columnWidth - doubleGap,
			margin: doubleGap / 2,
			padding: 10
		};

		let eventVisibleDetails = null;
		if (event.end - event.start >= (timeStep * 2)) {
			eventVisibleDetails = (
				<div>
					<div>Time:</div>
					<div>{event.start} - {event.end}</div>
					{event.guests && event.guests.length > 0 && (
						<div>
							<div>Guests:</div>
							<div>{event.guests.map(guest => guest.username).join(', ')}</div>
						</div>
					)}
				</div>
			)
		}

		return (
			<div key={event.id}
					className='calendarTable--column__eventContainer'
		      style={eventStyles} >
				<div className='calendarTable--column__event'
				      onClick={(clickEvt) => onEditHandler(clickEvt, event)}
							onMouseDown={(evt) => evt.stopPropagation()}
					    onMouseUp={(evt) => evt.stopPropagation()}>
					{eventVisibleDetails}
				</div>
			</div>
		)
	});

	const tableColumn = rows.map((rowNumber, i) => {
		let isSelected = false;
		let isLowestSelected = false;

		if (selectedCells.some((el) => el.colNumber === col.value && el.rowNumber === rowNumber)) {
			isSelected = true;
		}

		let lowestSelectedCellRowNumber = null;

		if (selectedCells[0]) {
			const firstSelectedCellRowNumber = selectedCells[0].rowNumber;
			const lastSelectedCellRowNumber = selectedCells[selectedCells.length - 1].rowNumber;

			if (firstSelectedCellRowNumber < lastSelectedCellRowNumber) {
				lowestSelectedCellRowNumber = lastSelectedCellRowNumber;
			} else {
				lowestSelectedCellRowNumber = firstSelectedCellRowNumber;
			}
		}

		if (lowestSelectedCellRowNumber === rowNumber) {
			isLowestSelected = true;
		}

		let isFirstRow = i === 0;

		return <TableCell key={i}
		                  col={col}
		                  row={rowNumber}
		                  sectionHeight={sectionHeight}
		                  isFirstColumn={isFirstColumn}
		                  isFirstRow={isFirstRow}
		                  isSelected={isSelected}
		                  isLowestSelected={isLowestSelected}
		                  />
	});

	return (
		<div className='calendarTable--column' style={{ width: columnWidth }}>
			{eventElements}
			{tableColumn}
		</div>
	);
}
