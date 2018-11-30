import React from 'react'

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

  export default Kurssit