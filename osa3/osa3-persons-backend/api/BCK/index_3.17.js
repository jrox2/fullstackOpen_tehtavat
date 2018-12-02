const http = require('http')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())

app.use(bodyParser.json())

//app.use(morgan('tiny'))

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

let persons = [
    {  
            "name": "Arto K Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Martti A Tienari",
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

  

  const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }
  
  

  app.get('/api/persons/:id', (request, response) => {
    Person
      .findById(request.params.id)
      .then(person => {
        
        response.json(formatPerson(person))
      })
  })
  
  app.put('/api/persons/:id', (request, response) => {
    Person
      .update()
      .then(person => {
        
        response.json(formatPerson(person))
      })
      .catch(error => {
        console.log('errori: ', error)
        response.status(500).end()
      })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person
    .findById(request.params.id)
    .remove()
    .then(savedPerson => {
      response.json(formatPerson(savedPerson))
    })
  
  })
  

  app.get('/api/persons', (request, response) => {
    Person
      .find({},  {__v: 0})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })
      
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    /* Person
      .find({},  {__v: 0})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })

    let testPersons = persons.map()

    console.log('testPersons', testPersons) */

    /* const nameTest = nameObject.name
    
    let persons = this.state.persons

    const existingName = testPersons.find( testName => testName.name === nameTest ) */

    const person = new Person({
      name: body.name,
      number: body.number
    })
    
  
    person
      .save()
      .then(savedPerson => {
        console.log('putattu')
        response.json(formatPerson(savedPerson))
        
      })
      .catch(error => {
        console.log('errori: ', error)
        response.status(500).end()
      })
  })
  
  
 /*  app.get('/api/persons', (request, response) => {
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
    
    return getRandomInt(999999)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log('body: ', body)

    let testPersons = persons
  
    if (body.name === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
    
    if (body.name === '') {
      return response.status(400).json({error: 'name missing'})
    }

    if (body.number === '') {
      return response.status(400).json({error: 'number missing'})
    }

    const existingName = testPersons.find( testName => testName.name === body.name )
    
    if (existingName) {
      console.log('existingName', existingName) 
      return response.status(400).json({error: 'name must be unique'})
      
    } else {

    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person) 
  }
}) */


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
