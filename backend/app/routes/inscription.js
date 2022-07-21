"use strict";

const express = require("express");
//const multipart = require("connect-multiparty");
//const AuthMiddleware = require("../middlewares/auth");
const InscriptionController = require("../controllers/inscription");
/*
const UploadMiddleware = multipart({
  uploadDir: `${process.env.MEDIA_FOLDER}/providers/`,
});
*/
const api = express.Router();

api.post("/inscription/",InscriptionController.create);
api.get("/inscription",InscriptionController.getAll);
api.get("/inscription/:inscription_uuid",InscriptionController.getById);
api.put("/inscription/:inscription_uuid",InscriptionController.update);
api.delete("/inscription/:inscription_uuid",InscriptionController.remove);

module.exports = api;
