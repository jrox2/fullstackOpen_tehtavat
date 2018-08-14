import React from 'react'
import ReactDOM from 'react-dom'

const Kurssit = (props) => {
  return (
    <div>
      
      <Otsikko kurssit={props.kurssit}/>
      <Sisalto kurssit={props.kurssit}/>
      
    </div>
    )
}

const Otsikko = (props) => {
    return (
      <div>
        <h1>{props.kurssit.nimi}</h1>
      </div>
    )
  }



const Sisalto = (props) => {
   
   const kurssit = () => props.kurssit.map((kurssi, index) =>
    <div key={index}>
        <h3>{kurssi.nimi}</h3>
        <ul>
            {Object.values(kurssi.osat).map((kurssi, index) =>
            <li key={index}>{kurssi.nimi}  {kurssi.tehtavia}</li>
            )}
        </ul>
        <p>Tehtäviä yhteensä: {Object.values(kurssi.osat).reduce(function(sum, amount) {
          return sum + amount.tehtavia;
          }, 0) }
          </p>
        
    </div>
)

    return (
        <div>
            <h1>Opetusohjelma</h1>
             <ul>
              {kurssit()}
            </ul>
        </div>
        )
}




const App = () => {
    const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
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
      },
      {
        nimi: 'Node.js',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]
  

  return (
    <div>
      <Kurssit kurssit={kurssit}/>
      
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)