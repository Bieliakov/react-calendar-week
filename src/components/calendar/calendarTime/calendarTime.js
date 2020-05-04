import React from 'react';
import './calendarTime.css';

export default ({rows, sectionHeight, timeSectionWidth}) => {

	let timeSections = rows.map((el, i) => {
		if (el === 0) {
			el = null;
		}

		return (
			<div key={i} style={{height: sectionHeight / 2, width: 50, position: 'relative'}}>
				<div style={{position: 'absolute', top: -12 , right: 5}}>
					{el}
				</div>
			</div>
		)
	});

	return (
		<div className='calendarTable--time' style={{height: '100%', width: timeSectionWidth, display: 'inline-block',}}>
			{timeSections}
		</div>
	);
};
