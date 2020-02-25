var MongoClient = require('mongodb').MongoClient;
const express = require('express')
const bodyParser= require('body-parser')
const index = require('./Routes/Index/')
const Attendence = require('./Routes/Attendence/index')
const Docs = require('./Routes/Document/index')


const app = express();
var url = "mongodb://localhost:27017/mydb";
var cors = require('cors')
app.use(cors())


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.set('view engine', 'ejs')

app.use('/',index)
app.use('/Attendence',Attendence)
app.use('/Document',Docs)

// Add headers



MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('test') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

