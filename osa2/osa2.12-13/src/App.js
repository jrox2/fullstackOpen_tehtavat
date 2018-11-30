
import React from 'react'
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newName: '',
      newnumber: '',
      filter: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }
  
  
    handleClick = (param) => (e) => { 
      console.log('Event', e);
      console.log('Parameter', param);
    }
  
  
  showFilteredNames = (props) => {
    let testCountries = this.state.countries
    let filteredNames = testCountries.filter(str => {
      return str.name.toLowerCase().includes(this.state.filter.toLowerCase())
    })
    if (filteredNames.length > 10) {
      return (
        <div>
          <em>Too many matches; Specify another filter</em>
        </div>
      )
    }
    if (filteredNames.length === 1) {
    return (
        <div>
          {filteredNames.map((country, i) => <li key={i}>{country.name}<br />Capital: {country.capital}<br />Population: {country.population} <img src={country.flag} className='smallFlag' alt=''/></li>)}
        </div>
        )
    }
    return (
        // <div className='clickableElement' onClick={(e) => this.handleClick(e)}>
        <div className='clickableElement'>
          {filteredNames.map((country, i) => <li key={i} ><div onClick={(e) => this.handleClick(e)}>{country.name}</div></li>)}
        </div>
        )
    }
  
  
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({filter: event.target.value})
    this.showFilteredNames()
  }

  handleListNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
   
  }

  handleListnumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newnumber: event.target.value})
  }

   
  
  
  render() {
    console.log('render')
    return (
      <div>
        <h2>Countries</h2>
        <form onSubmit={this.addListItem}>
        <div>
            Find countries: <input value={this.state.filter}
          
            onChange={this.handleFilterChange} required
            />
          </div>
         
        </form>
        <ul>   
            <this.showFilteredNames />
          </ul>
          
      </div>
    )
  }
}

export default App