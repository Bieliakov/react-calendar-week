import React  from 'react';
import './tableCell.scss';

export default (props) => {
	const { row, col, sectionHeight, isSelected, isFirstColumn, isFirstRow, isLowestSelected } = props;

	let additionalClasses = 'tableCell';

	if (isFirstColumn) {
		additionalClasses += ' isFirstColumn';
	}

	if (isSelected) {
		additionalClasses += ' isSelected';
	}

	if (isFirstRow) {
		additionalClasses += ' isFirstRow';
	}

	if (isLowestSelected) {
		additionalClasses += ' isLowestSelected';
	}

	return (
		<div className={additionalClasses}
	      style={{height: sectionHeight}}
				rownumber={row}
				colnumber={col.value}
		>

		</div>
	);
};

