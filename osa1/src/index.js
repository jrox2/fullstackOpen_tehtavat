import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi}</h1>
      </div>
    )
  }

const Sisalto = (props) => {
    return (
        <div>
             <p>{props.osa} {props.tehtavia}</p>
        </div>
        )
}


const Yhteensa = (props) => {
    return (
        <div>
        <p>yhteensä {props.yht} tehtävää</p>
        </div>
        )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
     
      <Sisalto osa={osat[0].nimi} tehtavia={osat[0].tehtavia}/>
      <Sisalto osa={osat[1].nimi} tehtavia={osat[1].tehtavia}/>
      <Sisalto osa={osat[2].nimi} tehtavia={osat[2].tehtavia}/>

      <Yhteensa yht={osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia}/>
     
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)