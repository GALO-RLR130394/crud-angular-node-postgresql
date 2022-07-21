"use strict";

const project = require("../../package.json");

const InscriptionRouter = require("./inscription");

module.exports = (app) => {
  //Root
  app.get("/", (req, res) => {
    res.json({
      title: `Welcome to ${project.name} API`,
      description: project.description,
      version: project.version,
    });
  });

  //Routers
 app.use("/api/", [
   InscriptionRouter
 ]);
};
