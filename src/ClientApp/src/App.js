import './App.css'
import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Header, Message } from "semantic-ui-react"
import { OptimizerForm, Coins } from './UI'
import COActionTypes from './ActionTypes'

const App = args => { 
  const props = {
    handleSubmit:args.handleSubmit, 
    handleChange: args.handleChange, 
    handleReset: args.handleClear 
  }

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
      <Divider hidden />
      <Coins {...props} {...args.appState} />
    </Container>
  )
}


const handleTotalAmountChange = (e, d) => {
  console.log(e.target.value)
}


const handleSubmit = (values, dispatch) => {
  
  setTimeout(() => {
    let testPayload = {
      loading: false,
      coins: [
        {
          name: 'quarter',
          count: 5,
        },
        {
          name: 'penny',
          count: 1
        }
      ]
    }
    
    dispatch({ type: COActionTypes.Completed, ...testPayload })
  }, 1000)

  dispatch({ type: COActionTypes.Optimize, loading: true })
}


const handleClear = (form,dispatch) => {
  form.reset()
  dispatch({ type: COActionTypes.Reset })
}


const mapStateToProps = state => {
  const appState = {
    loading : state.app.loading,
    coins : state.app.coins
  }
  return { appState }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange : event => handleTotalAmountChange(event, dispatch),
    handleSubmit : values => handleSubmit(values, dispatch),
    handleClear: form => handleClear(form, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);