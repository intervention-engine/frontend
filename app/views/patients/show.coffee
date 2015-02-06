`import Ember from 'ember'`
`import asterPlot from '../../utils/aster-plot'`
`import barChart from '../../utils/bar-chart'`
`import lineChart from '../../utils/line-chart'`

PatientShowView = Ember.View.extend
  didInsertElement: ->
    risks = []
    for i in d3.range(0,8)
      risks.push({name: i, weight: Math.floor(Math.random() * (5)+1), risk: Math.floor(Math.random() * (5)+1)})
    d3.select("#aster").datum(risks).call(asterPlot)
    barTest = []
    for i in d3.range(0,6)
      barTest.push({risk: i, value: Math.floor(Math.random() * (50))})
    d3.select("#barTest").datum(barTest).call(barChart)
    barTest = []
    for i in d3.range(0,6)
      barTest.push({risk: i, value: Math.floor(Math.random() * (10))})
    d3.select("#lineTest").datum(barTest).call(lineChart)

`export default PatientShowView`
