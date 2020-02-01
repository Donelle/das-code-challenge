import React, { Fragment } from 'react';
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/pro-regular-svg-icons'


const OptimizerForm = props => {
	const { handleSubmit, handleChange, reset, pristine, submitting } = props
	const iconStyle = { position: 'absolute',  zIndex:10, marginLeft: '10px', marginTop: '35px' }

	return (
		<Fragment>
			<Form onSubmit={handleSubmit}>

				<FontAwesomeIcon icon={ faCoins } style={iconStyle} />
				<Field 
					component={Form.Input} 
					name="totalAmount"
					iconPosition="left"
					label="Enter the Total Amount Below"
					placeholder="$0.00" 
					onKeyUp={handleChange} />
			
				<Form.Group inline>
					<Form.Button primary loading={submitting} disabled={pristine || submitting}>Submit</Form.Button>
					<Form.Button disabled={pristine || submitting} onClick={reset}>Clear</Form.Button>
				</Form.Group>
			</Form>
		</Fragment>
	)
}

export default reduxForm({ form: "optimizer" })(OptimizerForm);