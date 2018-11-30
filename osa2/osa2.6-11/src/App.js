import React from 'react'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', phone: '040-123456' },
        { name: 'Martti Tienari', phone: '040-123456' },
        { name: 'Arto Järvinen', phone: '040-123456' },
        { name: 'Lea Kutvonen', phone: '040-123456' }
      ],
      newName: '',
      newphone: '',
      filter: ''
    }
  }

  
  showFilteredNames = (props) => {
    let testPersons = this.state.persons
    let filteredNames = testPersons.filter(str => {
      return str.name.includes(this.state.filter)
    })
   
    return (
        <div>
          {filteredNames.map((person, i) => <li key={i}>{person.name} {person.phone}</li>)}
        </div>
        )
  }
  
  addListItem = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      phone: this.state.newPhone,
      filter: this.state.filter
    }

    let testPersons = this.state.persons
    const nameTest = nameObject.name
    
    let persons = this.state.persons

    const existingName = testPersons.find( testName => testName.name === nameTest );
    
    if (existingName) {
      console.log('existingName', existingName) 
      alert('Tämä nimi on jo luettelossa')
      
    } else {persons = this.state.persons.concat(nameObject)}

    this.setState({
      persons,
      newName: '',
      newPhone: '',
      filter: ''
    })

    
  }

  showPersonInputForm = (event) => {
    return (
      <div>
          <h2>Lisää uusi</h2>
          <div>
            nimi: <input value={this.state.newName}
          
            onChange={this.handleListNameChange} required
            />
          </div>
          <div>
            puh: <input value={this.state.newPhone}
          
            onChange={this.handleListPhoneChange}
            />
          </div>
          
          <div>
            <button type="submit">lisää</button>
          </div>
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

  handleListPhoneChange = (event) => {
    console.log(event.target.value)
    this.setState({newPhone: event.target.value})
  }

   
  
  
  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addListItem}>
        <div>
            Rajaa näytettäviä: <input value={this.state.filter}
          
            onChange={this.handleFilterChange}
            />
          </div>
          <this.showPersonInputForm />
        </form>
        <h2>Numerot</h2>
        <ul>   
            <this.showFilteredNames />
          </ul>
          
      </div>
    )
  }
}

export default App