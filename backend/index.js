"use strict";

require("dotenv").config();
const http = require("http");
// Create connection to database
const pgConnection=require('./app/config/pgConnection');
//const client = pgConnection.client;
//const poolPg = pgConnection.connection;
const app = require("./app/index");
const port = process.env.PORT || 4000;
const server = http.createServer(app);
/*
client.connect().then(() => {
   console.log('App connected to database')
   app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
      client.end();
   })
}).catch(err => {
   console.log(`Database is not available: ${err.stack}`)
})*/
server.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
}) 
module.exports = app;