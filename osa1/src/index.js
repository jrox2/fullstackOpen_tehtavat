import React from 'react'
import ReactDOM from 'react-dom'

  

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good_counter: 0,
        neutral_counter: 0,
        bad_counter: 0,
        allAnswers: []
      }
    }
    statistics = (props) => {
         if (this.state.allAnswers.length === 0) {
            return (
                <div>
                  <p>yhtään palautetta ei ole annettu</p>
                </div>
              )
        } 
        
        return (
            <div>
                <h1>statistiikka</h1>
                <div>hyvä {this.state.good_counter}</div>
                <div>neutraali {this.state.neutral_counter}</div>
                <div>huono {this.state.bad_counter}</div> 
                <div><this.statistic/></div>
            </div>
            )
    } 

    statistic = (props) => {
        let yhtl = 0
        let avg = 0
        let pos = 0
        let posPercentage = 0

        
        this.state.allAnswers.forEach((luku) => {
                yhtl += luku
                
               avg = yhtl /  this.state.allAnswers.length
               //console.log('yhte', yhtl, ' avg ', avg)
               if (luku === 1) {
                pos += 1 
               }
               posPercentage = (pos / this.state.allAnswers.length) * 100
        })

        return (
            <div>
                <div>Avg {avg.toFixed(2)}</div>
                <div>Positiivisia {posPercentage.toFixed(2)} %</div>
            </div>
        )
        
    }
   
    
    
    kasvataYhdella = (arvo) => () => {
        
        console.log('arvo', arvo)


        if (arvo === 'good_counter'){
            this.setState({          
                good_counter: this.state.good_counter + 1,
                allAnswers: this.state.allAnswers.concat(1)
            
            
            })
        }
        if (arvo === 'neutral_counter'){
            this.setState({  
                neutral_counter: this.state.neutral_counter + 1,
                allAnswers: this.state.allAnswers.concat(0)
            
            })
        }
        if (arvo === 'bad_counter'){
            this.setState({  
                bad_counter: this.state.bad_counter + 1,
                allAnswers: this.state.allAnswers.concat(-1)
            
            })
        }  
    }
    

    render() {
        
      return (
        <div> 
            <h1>Anna palautetta</h1>
          <div>
            <button onClick={this.kasvataYhdella('good_counter')}>
                hyvä
            </button>
            <button onClick={this.kasvataYhdella('neutral_counter')}>
              neutraali
            </button>
            <button onClick={this.kasvataYhdella('bad_counter')}>
              huono
            </button>
            <div>
                <this.statistics/>
            </div>
          </div>
        </div>
      )
    }

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)