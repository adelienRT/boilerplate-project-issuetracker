'use strict';
let submit = require('../controller/submit');
let update = require('../controller/update');
let deleteIssue = require('../controller/delete');
let Db = require('../controller/falseControllers/falseDB');


module.exports = function (app) {

  app.route('/api/issues/:project')
    .all(function(req,res,next){
      let projectName = req.params.project;
      req.params.db = new Db(projectName);
      next();
    })
  
    .get(function (req, res){
      let response ={}
      req.params.db.import();
      if(!req.query){
        response = req.params.db.getAll();
      } else {
        response = req.params.db.getFilter(req.query);
      }
      res.json(response);
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let response = submit(req.body,req.params.db);
      res.json(response);
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let response = update(req.body,req.params.db);
      res.json(response);
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let response = deleteIssue(req.body._id,req.params.db);
      res.json(response);
    });

    
};
