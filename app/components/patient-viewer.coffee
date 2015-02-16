`import Ember from 'ember'`

PatientViewerComponent = Ember.Component.extend(
  patient: null

  randomData: []
  randomRisk: []
  randomDataLong: []

  generateRandomData: (->
    randomData = []
    randomRisk = []
    randomDataLong = []

    for i in d3.range(0,6)
      randomData.push({ risk: i, label: "#{i/2}", value: Math.floor(Math.random() * (10)) })
    for i in d3.range(0,24)
      randomDataLong.push({ risk: i, label: "#{i/2}", value: Math.floor(Math.random() * (5) + 1) })
    for i in d3.range(0,8)
      randomRisk.push({ name: i, weight: Math.floor(Math.random() * (5)+1), risk: Math.floor(Math.random() * (5)+1) })

    @set('randomData', randomData)
    @set('randomRisk', randomRisk)
    @set('randomDataLong', randomDataLong)
  ).observes('patient').on('init')
)

`export default PatientViewerComponent`
