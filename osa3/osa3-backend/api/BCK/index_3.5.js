const http = require('http')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
  
  const generateId = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
    
    
    //const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    return getRandomInt(999999)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log('body: ', body)
  
    if (body.name === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)