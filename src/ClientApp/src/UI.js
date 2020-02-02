import React, { Fragment } from 'react';
import { Form as FinalForm, Field as FormField } from 'react-final-form'
import { Form, Grid, Placeholder, Image, Header } from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/pro-regular-svg-icons'

/* eslint-disable */
const CurrencyFormatter = new function() { 
	// Reference: https://codepen.io/559wade/pen/LRzEjj
	this.onKeyUp = e => 
		this.format(e.target)
	
	this.onBlur = e => 
		this.format(e.target, true)	

	this.formatNumber = n => 
		n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

	this.format = (input, blur) => {
		let input_val = input.value
		if (input_val === "") return
		
		let original_len = input_val.length,
				caret_pos = input.selectionStart
			
		if (input_val.indexOf(".") >= 0) {
			let decimal_pos = input_val.indexOf("."),
					left_side = input_val.substring(0, decimal_pos),
					right_side = input_val.substring(decimal_pos)

			left_side = this.formatNumber(left_side)
			right_side = this.formatNumber(right_side)
			
			if (blur) right_side += "00"
						
			right_side = right_side.substring(0, 2)
			input_val = "$" + left_side + "." + right_side
		} else {
			input_val = this.formatNumber(input_val)
			input_val = "$" + input_val
			if (blur) input_val += ".00"
		}
	
		input.value = input_val;
		
		let updated_len = input_val.length
		caret_pos = updated_len - original_len + caret_pos;
		input.setSelectionRange(caret_pos, caret_pos);
	}
}
/* eslint-enable */

const coinStyle = { 
	column: {  height: 'auto', width: 'auto' },
	image: { display: 'flex', height: '50px' },
	grid: { justifyContent : 'left' }
}


const Coin = props => {
	return (
		<Grid.Column key={props.name} textAlign='center' style={coinStyle.column} >
			<Image src={props.image} style={coinStyle.image} />
			<Header as='h1'>{props.count}</Header>
		</Grid.Column>
	)
}


export const Coins = props => {
	return (
		<Fragment>
		{ props.loading ? 
				<Placeholder fluid>
					<Placeholder.Image square />
				</Placeholder>
				: 
				( props.coins.length > 0 && 
					<Grid centered={false} textAlign='center' style={coinStyle.grid} >
						{	 props.coins.map(data => <Coin {...data } />) }
					</Grid>
				)
			}
		</Fragment>
	)
}


export const OptimizerForm = props => {
	const iconStyle = { position: 'absolute',  zIndex:10, marginLeft: '10px', marginTop: '35px' }
	return (
		<Fragment>
			<FinalForm onSubmit={props.handleSubmit} >
				{
					({ handleSubmit, form, pristine, submitting }) => (
						<Form onSubmit={handleSubmit} >
							<FontAwesomeIcon icon={ faCoins } style={iconStyle} />
							<FormField 
								component={Form.Input} 
								name="totalAmount"
								iconPosition="left"
								label="Enter the Total Amount Below"
								placeholder="$0.00"
								pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" 
								onKeyUp={CurrencyFormatter.onKeyUp}
								onBlur={CurrencyFormatter.onBlur} />	 
												
							<Form.Group inline>
								<Form.Button primary loading={submitting} disabled={pristine || submitting}>Submit</Form.Button>
								<Form.Button disabled={pristine || submitting} onClick={() => props.handleReset (form)}>Clear</Form.Button>
							</Form.Group>
						</Form>
					)
				}
			</FinalForm>
		</Fragment>
	)
}