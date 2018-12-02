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
  
  
  app.get('/api/persons', (req, res) => {
    console.log('get persons')
    res.json(persons)
    
  })

  app.get('/api/info', (req, res) => {
    const numberOfPersons = persons.length
    const dateToday = new Date
    res.send('<p>Puhelinluettelossa on ' +numberOfPersons+ ' henkilön tiedot <br /><br />' +dateToday+ '</p>')
    
  })

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)