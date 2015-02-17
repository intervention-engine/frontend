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

    for i in d3.range(1,7)
      randomData.push({ risk: i, label: "#{i/2}", value: Math.floor(Math.random() * (10)) })
    for i in d3.range(0,24)
      upOrDown = Math.floor(Math.random() * 2)
      value = if i == 0 then Math.floor(Math.random() * (5) + 1) else randomDataLong[randomDataLong.length - 1].value
      if upOrDown == 1 && value < 6
        value += 1
      else if upOrDown == 0 && value > 1
        value -= 1

      randomDataLong.push({ risk: i, label: "#{i/2}", value: value })
    for i in d3.range(0,8)
      randomRisk.push({ name: i, weight: Math.floor(Math.random() * (5)+1), risk: Math.floor(Math.random() * (5)+1) })

    console.debug randomDataLong

    @set('randomData', randomData)
    @set('randomRisk', randomRisk)
    @set('randomDataLong', randomDataLong)
  ).observes('patient').on('init')
)

`export default PatientViewerComponent`
