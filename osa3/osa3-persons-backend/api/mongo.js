const mongoose = require('mongoose')

const args = process.argv;
console.log(args);

const argsPersonName = args[2]
const argsPersonNumber = args[3]

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
//const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'
//const url = 'mongodb://personsAdmin:musiikinLahja9500@ds237192.mlab.com:37192/fullstack-persons'
const url = 'mongodb://personsAdmin:musiikinLahja9500@ds235833.mlab.com:35833/fullstack-persons-dev'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (argsPersonName != null && argsPersonNumber != null) {
  console.log('tehdään lisäys')

  const person = new Person({
    name: argsPersonName,
    number: argsPersonNumber
  })

  person
    .save()
    .then(response => {
      console.log('Lisätään henkilö ', argsPersonName, ' numero ', argsPersonNumber )
      mongoose.connection.close()
    })

  } else {

  Person
    .find({})
    .then(result => {
      console.log('Puhelinluettelo: ')
      result.forEach(person => {
        console.log(person.name, ' ', person.number)
      })
      mongoose.connection.close()
    })
}