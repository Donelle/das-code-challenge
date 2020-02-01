import './App.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Header, Message } from "semantic-ui-react"
import  OptimizerForm from './UI'
import  COActionTypes from './ActionTypes'

const App = args => { 
  const props = { handleChange: args.handleChange }

  useEffect(
    () => {
      // TODO Execute Optimize Service 
    }
  )

  return (
    <Container>
      <Divider hidden />
      <Header as="h1" dividing>Coin Optimizer</Header>
      <Message info>
        <p>
          This coin optimizer application demonstrates how to find the most optimial amount of coins a user would
          would receive by entering the total amount of monies in the input box below
        </p>
      </Message>
      <OptimizerForm onSubmit={args.handleSubmit} {...props } />
    </Container>
  )
}

const handleTotalAmountChange = (e, d) => {
  console.log(e.target.value)
}

const handleSubmit = (v, d) => {
  console.log('Caught handleSubmit')
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange : event => handleTotalAmountChange(event, dispatch),
    handleSubmit : values => handleSubmit(values, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(App);