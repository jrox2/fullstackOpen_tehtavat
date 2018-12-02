const http = require('http')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let persons = [
    {
          
            "name": "Arto K Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Martti Tienari",
            "number": "040-123456",
            "id": 2
          },
          {
            "name": "Arto Järvinen",
            "number": "040-123456",
            "id": 3
          },
          {
            "name": "Lea Kutvonen",
            "number": "040-123456",
            "id": 4
          },
          {
            "name": "Johan Båmpas",
            "number": "040-123456",
            "id": 5
          }
      
  ]
  
  
  app.get('/api/persons', (request, response) => {
    console.log('get persons')
    response.json(persons)
    
  })

  app.get('/api/info', (request, response) => {
    const numberOfPersons = persons.length
    const dateToday = new Date
    response.send('<p>Puhelinluettelossa on ' +numberOfPersons+ ' henkilön tiedot <br /><br />' +dateToday+ '</p>')
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)