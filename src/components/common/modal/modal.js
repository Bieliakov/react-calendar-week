import React  from 'react';
import './modal.scss';

export default (props) => {
	const isOpened = props.isOpened || false;

	if (!isOpened) {
		return null;
	}

	const {closeDialog, onClickOKCb, onClickedInsideDialog, title} = props;

	const clickedInside = (event) => {
		event.stopPropagation();
		onClickedInsideDialog();
	};

	return (
		<div className='modal' onClick={closeDialog}>

			<div className='modal-main' onClick={clickedInside}>
				<div>{title}</div>
				<div style={{height:'100%'}}>
					{props.children}
				</div>

				<div className="modal--footer">
					<div>
						<button className='button button--OK' onClick={onClickOKCb}>OK</button>
					</div>
					<div>
						<button className='button button--cancel' onClick={closeDialog}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	)
};
