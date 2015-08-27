
var patient1 = {
  "resourceType": "Bundle",
  "entry": [
    {
      "resource":{
      "resourceType": "Encounter",
      "id": 1,
      "type": [{
        "coding": [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": "99221",
          "display": "Inpatient Encounter"
        }]
      }],
      "period": {
        "start": "2015-04-01T05:15:00-04:00",
        "end": "2015-04-03T12:30:00-04:00"
      }
      }
    },
    {
      "resource":{
      "resourceType": "Encounter",
      "id": 2,
      "type": [{
        "coding": [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": "99221",
          "display": "Inpatient Encounter"
        }]
      }],
      "period": {
        "start": "2015-04-01T05:15:00-04:00",
        "end": "2015-04-03T12:30:00-04:00"
      }
      }
    },
    {
      "resource":{
      "resourceType": "Encounter",
      "id": 3,
      "type": [{
        "coding": [{
          "system": "http://www.ama-assn.org/go/cpt",
          "code": "99201",
          "display": "Outpatient Office Visit"
        }]
      }],
      "period": {
        "start": "2015-04-01T05:15:00-04:00",
        "end": "2015-04-03T12:30:00-04:00"
      }
      }
    }

  ]
};

export {patient1 as default};
