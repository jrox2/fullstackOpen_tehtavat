import React from 'react'
import ReactDOM from 'react-dom'






  

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good_counter: 0,
        neutral_counter: 0,
        bad_counter: 0,
        total_counter: 0
      }
    }
  
    statistics = (props) => {
        return (
            <div>
                <h1>statistiikka</h1>
                <div>hyvä {this.state.good_counter}</div>
                <div>neutraali {this.state.neutral_counter}</div>
                <div>huono {this.state.bad_counter}</div> 
                <div>total {this.state.total_counter}</div>  
                <div>
                <p>yhteensä {props.yht} tehtävää</p>
                </div>
            </div>
            )
    } 

    klikGood = () => {
        this.setState({
         good_counter: this.state.good_counter + 1,
         total_counter: this.state.total_counter + this.state.good_counter
         

        })
        
    }
    klikNeutral = () => {
        this.setState({
            neutral_counter: this.state.neutral_counter + 1   
           })
    }
    klikBad = () => {
        this.setState({
            bad_counter: this.state.bad_counter + 1   
           })
    }
    

    render() {
      return (
        <div>
          
          <div>
            <button onClick={this.klikGood}>
              hyvä
            </button>
            <button onClick={this.klikNeutral}>
              neutraali
            </button>
            <button onClick={this.klikBad}>
              huono
            </button>
            <this.statistics/>
          </div>
        </div>
      )
    }
  }

 


ReactDOM.render(
  <App />,
  document.getElementById('root')
)