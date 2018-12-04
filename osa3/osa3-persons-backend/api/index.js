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


const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

//app.use(express.static('build'))

app.use(logger)

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
      .findById(request.params.id)
      .update(request.body)
      .then(person => {
        
        response.json(formatPerson(person))
       
      })
      .catch(error => {
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
    Person
      .findById(request.params.name)
      .then(console.log('löytyi'))

    if (body.name === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
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
  
  
 


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
