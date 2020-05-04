import React, { useRef, useState, useEffect, useContext } from 'react';

import CalendarTableColumn from './calendarTableColumn/calendarTableColumn';
import {EventsDataContext} from "../../../context/EventsDataProvider";

export default (props) => {
	const { selectedHandler, rows, columnWidth, timeStep, onEditEvent, cols, sectionHeight, scrollToTableTop } = props;

	let {events} = useContext(EventsDataContext);

	const [selectionStarted, setSelectionStarted] = useState(null);
	const [selectedCells, setSelectedCells] = useState([]);
	const [firstClickedPosition, setFirstClickedPosition] = useState(null);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const tableRef = useRef();

	useEffect(() => {
		const positions = tableRef.current.getBoundingClientRect();

		setDistanceToTop(positions.top);
	}, []);

	function getPositionRelativeToTableTop(clientY) {
		// if there will be scroll at document or parent element - document.scrollingElement.scrollTop or parent's scrollTop
		// should be added
		return clientY - distanceToTop + scrollToTableTop;
	}

	const onMouseDown = (event) => {
		event.preventDefault();
		setSelectionStarted(true);
		setFirstClickedPosition(getPositionRelativeToTableTop(event.clientY));

		const rowNumber = parseFloat(event.target.getAttribute('rownumber'));
		const colNumber = parseFloat(event.target.getAttribute('colnumber'));

		const cellData = {
			rowNumber,
			colNumber
		};

		setSelectedCells((state) => {
			return [
				...state,
				cellData
			];
		});
	};

	const onMouseMoveHandler = (event) => {

		if (selectionStarted) {
					const startingPositionInPX = firstClickedPosition;
					const currentPositionInPX = getPositionRelativeToTableTop(event.clientY);

					const startingCell = startingPositionInPX / sectionHeight;
					const currentCell = currentPositionInPX / sectionHeight;

					const roundedStartingCell = Math.floor(startingCell);
					const roundedCurrentCell = Math.floor(currentCell);

					const startingTime = roundedStartingCell * timeStep;
					const currentTime = roundedCurrentCell * timeStep;

					let from, to;

					if (currentTime >= startingTime) {
						from = startingTime;
						to = currentTime;
					} else {
						from = currentTime;
						to = startingTime;
					}

					let newSelectedCells = [];

					for (let i = from; i <= to; i = i + timeStep) {
						newSelectedCells.push({
							rowNumber: i,
							colNumber: selectedCells[0].colNumber
						})
					}

					setSelectedCells(newSelectedCells);
		}

	};

	const onMouseUpHandler = () => {
		setSelectionStarted(false);
		selectedHandler(selectedCells, selectedCells[0].colNumber);

		setSelectedCells([]);
	};


	const tableColumns = cols.map((colEl, colElIndex) => {
		const columnEvents = events.filter(event => event.date.day === colEl.day);

		let isFirstColumn = colElIndex === 0;

		return <CalendarTableColumn key={colElIndex}
		                  col={colEl}
		                  rows={rows}
		                  sectionHeight={sectionHeight}
                      selectedHandler={selectedHandler}
                      columnEvents={columnEvents}
                      isFirstColumn={isFirstColumn}
                      columnWidth={columnWidth}
                      timeStep={timeStep}
                      onEditEvent={onEditEvent}
                      selectedCells={selectedCells}
		/>
	});

	return (
		<>
			<div onMouseDown={onMouseDown}
			     onMouseMove={onMouseMoveHandler}
			     onMouseUp={onMouseUpHandler}
			     ref={tableRef}
			>
				{tableColumns}
			</div>
		</>
	);
};
