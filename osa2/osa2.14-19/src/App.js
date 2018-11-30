import React from 'react'
import nameService from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newnumber: '',
      filter: '',
      success: null,
      error: null
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    nameService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }
  
  showFilteredNames = (props) => {
    let testPersons = this.state.persons
    let filteredNames = testPersons.filter(str => {
      return str.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    })
   
    return (
      <div className='form-row'>
        <table>
          <tbody>
            {filteredNames.map((person, i) => <tr key={i}><td className='form-td-50'>{person.name}</td><td className='form-td-30'>{person.number}</td><td className='form-td-20'><button onClick={this.deleteRow(person.id, person.name)}>Poista</button></td></tr>)}    
          </tbody>
        </table>
      </div>
      )
  }
  
  addListItem = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newnumber,
      filter: this.state.filter
    }

    let testPersons = this.state.persons
    const nameTest = nameObject.name
    
    let persons = this.state.persons

    const existingName = testPersons.find( testName => testName.name === nameTest )
    
    if (existingName) {
      console.log('existingName', existingName) 
      if (window.confirm('on jo luettelossa. Korvataanko vanha numero uudella?')) {
        const updateThisID = testPersons.find( testName => testName.name === nameTest ).id
        console.log('updateThisID: ', updateThisID)
        this.updateListItem(updateThisID, nameObject)   
      }
      
    } else {
    
    nameService
      .create(nameObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newNote: '',
          success: `henkilön '${nameObject.name}' tiedot lisätty`
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 5000)
      })
    }
    
    this.setState({
      persons,
      newName: '',
      newnumber: '',
      filter: ''
    })
  }

  updateListItem = (paramId, nameObject) => {
    nameService
      .update(paramId, nameObject)
      .then(response => {
        console.log('response: ', nameObject)
        this.setState({
          persons: this.state.persons.map(person => person.id !== paramId ? person : nameObject),
          success: `henkilön '${nameObject.name}' puhelinnumero päivitetty`
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 5000)
      })
      .catch(error => {
        this.setState({
          error: `henkilö: '${paramId}' on jo valitettavasti poistettu palvelimelta`,
          persons: this.state.persons.filter(n => n.id !== paramId)
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
    }

  deleteRow = (paramId, paramName) => (e) => { 
    if (window.confirm("Poistetaanko: " +paramName)) {   
      const deletedIndex = this.state.persons.findIndex(person => person.id === paramId)
      
      console.log('ParamId', paramId, 'paramName', paramName, 'deletedIndex: ', deletedIndex);
      
      nameService
        .deletePerson(paramId)
        .then(res => {
          
          console.log('deletedIndex: ', deletedIndex)
          
          let array = this.state.persons
          array.splice(deletedIndex, 1)
          console.log('array', array)

          this.setState({
            persons: array
            
          })
        })
        .catch(error => {
          this.setState({
            error: `Henkilö:  '${paramName
            }' on jo valitettavasti poistettu palvelimelta`,
            persons: this.state.persons.filter(n => n.id !== paramId)
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
        })
      }
  }

  showPersonInputForm = (event) => {
    return (
      <div>
          <h2>Lisää uusi</h2>
          <div className='form-row'>
            <label className='form-input-label'>nimi:</label>
            <input value={this.state.newName}
                onChange={this.handleListNameChange} required />
          </div>
          <div className='form-row'>
          <label className='form-input-label'>puh:</label>
          <input value={this.state.newnumber}
              onChange={this.handleListnumberChange} />
          </div>
          <div className='form-row'>
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

  handleListnumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newnumber: event.target.value})
  }

  notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
  errorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  successNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  render() {
    console.log('render')
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div className='form-row'>
          <this.errorNotification message={this.state.error}/> 
        </div>
        <div className='form-row'>
          <this.successNotification message={this.state.success}/> 
        </div>
        <form onSubmit={this.addListItem}>
        <div className='form-row'>
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