"use strict";

const { Pool } = require('pg');
const { Client } = require('pg');

let config={};

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  console.log('production');
  // Database Connection for Production
  config={
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT
  };
  //ONLY FOR GOOGLE CLOUD
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}else{
   console.log('Development');
   //pgLocal
   config.database="ecuadorTest",
   config.password="RLR130394"
   config.host='localhost'//'postgresql'
   config.user="postgres"
   config.port=5432
  
}

//const client = new Client(config)
const pool = new Pool(config);
module.exports ={ pool };
