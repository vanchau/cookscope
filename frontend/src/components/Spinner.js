import React from 'react'
import '../css/Spinner.css'

const Spinner = () => {
	return (
	<div className='spinner-background'>
		<div className='spinner-filler'/>
		<div className="spinner-box">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
		</div>
	</div>	
	)
}

export default Spinner;
