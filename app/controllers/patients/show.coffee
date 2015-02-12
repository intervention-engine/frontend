`import Ember from 'ember'`

PatientsShowController = Em.Controller.extend
  randomData: []
  randomRisk: []
  randomDataLong: []

  init: ->
      for i in d3.range(0,6)
        @randomData.push({risk: i, label: "#{i/2}", value: Math.floor(Math.random() * (10))})
      for i in d3.range(0,24)
        @randomDataLong.push({risk: i, label: "#{i/2}", value: Math.floor(Math.random() * (5) + 1)})
      for i in d3.range(0,8)
        @randomRisk.push({name: i, weight: Math.floor(Math.random() * (5)+1), risk: Math.floor(Math.random() * (5)+1)})

`export default PatientsShowController`
