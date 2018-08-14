import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = (props) => {
  return (
    <div>
      
      <Otsikko kurssi={props.kurssi}/>
      <Sisalto kurssi={props.kurssi}/>
    
    </div>
    )
}

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssi.nimi}</h1>
      </div>
    )
  }

const Sisalto = (props) => {
   const rivit = () => props.kurssi.osat.map((osa, i) => <li key={i}>{osa.nimi}  {osa.tehtavia}</li>)
    return (
        <div>
             <ul>
              {rivit()}
            </ul>
        </div>
        )
}




const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi}/>
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)