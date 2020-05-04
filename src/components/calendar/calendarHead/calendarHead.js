import React from 'react';
import './calendarHead.scss';

export default ({ cols, timeSectionWidth, columnWidth }) => {

	return (
		<div className='calendarHead'>
			<div style={{width: timeSectionWidth}}></div>
			<div style={{display: 'flex', width: `calc(100% - ${timeSectionWidth}px - 16px)` }}>
				{cols.map((col) => {
					return (
						<div key={col.day} style={{width: columnWidth, textAlign: 'center'}}>
							<div>{col.shortDayLabel}</div>
							<div>{col.day}</div>
						</div>
					);
				})}
			</div>
		</div>
	)
}
