module.exports = function(app) {
  var express = require('express');
  var patientsRouter = express.Router();

  patientsRouter.get('/', function(req, res) {
    res.send({
      resourceType: 'Bundle',
      entry: [{content: {id: 1, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]}}]
    });
  });

  patientsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  patientsRouter.get('/:id', function(req, res) {
    res.send({
        id: req.params.id, Name: [{ Family: ["A"], Given: ["BH_Adult"]}]
    });
  });

  patientsRouter.put('/:id', function(req, res) {
    res.send({
      'patients': {
        id: req.params.id
      }
    });
  });

  patientsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/testing/Patient', patientsRouter);
};
