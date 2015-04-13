module.exports = function(app) {
  var express = require('express');
  var encountersRouter = express.Router();

  encountersRouter.get('/', function(req, res) {
    res.send({
      resourceType: 'Bundle',
      entry: [
        {content: {id: 1, Type: [{Coding: [{System: "http://www.ama-assn.org/go/cpt", Code: "99221"}], Text: "Inpatient Encounter"}],
                   Period: {Start: "2012-10-01T08:00:00-04:00", End: "2012-10-01T09:00:00-04:00"}}
        }]
    });
  });

  encountersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  encountersRouter.get('/:id', function(req, res) {
    res.send({
      'encounters': {
        id: req.params.id
      }
    });
  });

  encountersRouter.put('/:id', function(req, res) {
    res.send({
      'encounters': {
        id: req.params.id
      }
    });
  });

  encountersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/testing/Encounter', encountersRouter);
};
