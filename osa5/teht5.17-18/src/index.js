import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'


const Statistiikka = () => {
  

  let sum, percentageOfPositives = 0

  const arr1 = store.getState()
  
  sum = arr1.good + arr1.ok + arr1.bad
  percentageOfPositives = (arr1.good / sum) * 100
 

  
  return (
    <div>
      <h2>statistiikka</h2>

      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{arr1.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{arr1.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{arr1.bad}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{percentageOfPositives.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>
    </div >
  )  
}

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

let state = initialState

deepFreeze(state)

const store = createStore(counterReducer)

class App extends React.Component {
  
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK'})}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>huono</button>
        <Statistiikka /> 
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)