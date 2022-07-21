const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const { successResponse, errorResponse } = require("../middlewares/responses");
const pgConnection=require('../config/pgConnection');
const poolPg= pgConnection.pool;
const moment = require('moment-timezone');

module.exports = {
  getAll:function (req, res, next) {
   
    const query=`SELECT * FROM inscriptions WHERE status=1`;

    poolPg.connect().then(client => {
      return client.query(query).then(resp => {
        client.release();
        let providers=resp.rows;
        return successResponse(providers, res);
      }).catch(err => {
        client.release();
        console.log(err.stack)
        console.log(err);
        return errorResponse(err, res);
      })
    })
  },
  getById:function(req, res, next){
    
    /***
     * @Params
    ***/

    const inscription_uuid= req.params.inscription_uuid;
    
    const query=`SELECT * FROM inscriptions WHERE inscription_uuid='${inscription_uuid}' AND status=1`;
    
    poolPg.connect().then(client => {
      return client.query(query).then(resp => {
        client.release();
        let data=resp.rows[0];
        return successResponse(data, res);
      }).catch(err => {
        client.release();
        console.log(err.stack)
        console.log(err);
        return errorResponse(err, res);
      })
    });
  },
  create:function(req, res, next) {

    /***
     * @Params
    ***/

    const {
      firstname,
      lastname,
      birthday,
      inscription_date,
      cost
    }=req.body;

    try {
      if (
        typeof firstname=== undefined ||
        typeof lastname === undefined ||
        typeof birthday === undefined ||
        typeof inscription_date === undefined ||
        typeof cost === undefined 
      ) {
        throw new Error("Please check the data sent");
      }

      const query = {
        text: `INSERT INTO inscriptions (firstname,lastname,birthday,inscription_date,cost) 
          VALUES ($1,$2,$3,$4,$5) RETURNING inscription_uuid`,
        values: [
          firstname,
          lastname,
          birthday,
          inscription_date,
          cost
        ]
      };

      poolPg.connect().then(client => {
        client.query(query).then(resp => {
          client.release();
          let inscription_uuid=resp.rows[0].inscription_uuid;
          const msg={message: "Create inscription",uuid:inscription_uuid}
          return successResponse(msg, res);
        }).catch(err => {
          client.release();
          console.log(err.stack)
          console.log(err);
          return errorResponse(err.message, res);
        })
      });
    } catch (err) {
      console.log(err);
      return errorResponse(err, res);
    }
  },
  update:function(req, res, next) {

    /***
     * @Params
    ***/

    const inscription_uuid= req.params.inscription_uuid;
    const {
      firstname,
      lastname,
      birthday,
      inscription_date,
      cost
    }=req.body;

    const query=`UPDATE inscriptions SET firstname='${firstname}',lastname='${lastname}',
          birthday='${birthday}',inscription_date='${inscription_date}' 
          WHERE inscription_uuid='${inscription_uuid}'`;
        
      poolPg.connect().then(client => {
        client.query(query).then(resp => {
          client.release();
          const msg={message: "Updated inscription"}
          return successResponse(msg, res);
        }).catch(err => {
          client.release();
          console.log(err.stack)
          console.log(err);
          return errorResponse(err, res);
        });
      });
  },
  remove:function (req, res, next) {

    /***
     * @Params
    ***/

    const inscription_uuid= req.params.inscription_uuid;
    const query=`UPDATE inscriptions SET status=0 WHERE inscription_uuid='${inscription_uuid}'`;

    poolPg.connect().then(client => {
      client.query(query).then(resp => {
        client.release();
        const msg={message: "Inscription removed"}
        return successResponse(msg, res);
       }).catch(err => {
        client.release();
        console.log(err.stack)
        console.log(err);
        return errorResponse(err, res);
      });
    });
  }
};
