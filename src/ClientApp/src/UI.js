import React, { Fragment } from 'react';
import { Form as FinalForm, Field as FormField } from 'react-final-form'
import { Form, Grid, Placeholder, Image, Header } from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/pro-regular-svg-icons'


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
						<Form onSubmit={handleSubmit}>
							<FontAwesomeIcon icon={ faCoins } style={iconStyle} />
							<FormField 
								component={Form.Input} 
								name="totalAmount"
								iconPosition="left"
								label="Enter the Total Amount Below"
								placeholder="$0.00" 
								onKeyUp={props.handleChange} />	 
												
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