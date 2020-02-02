import './App.css'
import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Header, Message } from "semantic-ui-react"
import { OptimizerForm, Coins } from './UI'
import OptimizeServiceFactory from './AppService'
import COActionTypes from './ActionTypes'

const App = args => { 
  const props = { handleSubmit:args.handleSubmit,  handleReset: args.handleClear }
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

const fireAction = (action, data, dispatch) =>
  dispatch({ type: action, ...data })


const handleSubmit = async (values, dispatch) => {
  if (!values || !values.totalAmount) return
  fireAction(COActionTypes.Optimize, {}, dispatch)

  let 
    parts = values.totalAmount.replace(/[^0-9.]+/g,'').split('.'),
    amount = (parts[0] * 100) + parseInt((parts.length > 1 ? 
        (parts[1].length === 1 ? parts[1] + '0': parts[1] ) : 0)),  
    state = { loading: false, coins: [] },
    service = OptimizeServiceFactory.create(),
    result = await service.optimize(amount)
  
  if (result.Ok) {
    state.coins = result.Content
    fireAction(COActionTypes.Completed, state, dispatch)
  } else {
    fireAction(COActionTypes.Failed, state, dispatch)
  }
}


const handleClear = (form,dispatch) => {
  form.reset()
  fireAction(COActionTypes.Reset, {}, dispatch)
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
    handleSubmit : values => handleSubmit(values, dispatch),
    handleClear: form => handleClear(form, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);