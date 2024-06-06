require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const Pool = pg.Pool;

const DBHOST = 'localhost'
const DBNAME = 'Autobases'
const DBUSER = 'autobase'
const DBPASSWORD = '1234567'

const pool = new Pool({
  host: DBHOST,
  user: DBUSER,
  password: DBPASSWORD,
  database: DBNAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const app = express();
const port = 3001;

const cors = require('cors');  // чтобы не было ошибки cors
app.use(cors())
app.use(bodyParser.json())

//add to req postgres pool
app.use((req, res, next) => {
  req.pool = pool
  next()
})

app.use('/api', require('./router').router);
app.get('*', function(_req, res){
    res.status(404).json({error: 'Api Url не найден'});
});
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({error: err.message})
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
