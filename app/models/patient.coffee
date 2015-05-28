# Copyright (c) 2011+, HL7, Inc & The MITRE Corporation
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
#     * Redistributions of source code must retain the above copyright notice, this
#       list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright notice,
#       this list of conditions and the following disclaimer in the documentation
#       and/or other materials provided with the distribution.
#     * Neither the name of HL7 nor the names of its contributors may be used to
#       endorse or promote products derived from this software without specific
#       prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
# IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
# INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
# NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
# PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

`import DS from 'ember-data'`

Patient = DS.Model.extend(
  identifier: DS.hasMany('identifier')
  name: DS.hasMany('human-name')
  telecom: DS.hasMany('contact-point')
  gender: DS.belongsTo('codeable-concept')
  birthDate: DS.attr('date')
  deceasedBoolean: DS.attr('boolean')
  deceasedDateTime: DS.attr('date')
  address: DS.hasMany('address')
  maritalStatus: DS.belongsTo('codeable-concept')
  multipleBirthBoolean: DS.attr('boolean')
  multipleBirthInteger: DS.attr()
  photo: DS.hasMany('attachment')
  contact: DS.hasMany('contact')
  animal: DS.belongsTo('animal')
  communication: DS.hasMany('codeable-concept')
  careProvider: DS.hasMany('reference')
  managingOrganization: DS.belongsTo('reference')
  link: DS.hasMany('link')
  active: DS.attr('boolean')
  conditions: DS.hasMany('condition', async: true)
  observations: DS.hasMany('observation', {async: true})
  encounters: DS.hasMany('encounter', async: true)
  medications: DS.hasMany('medicationStatement', async: true)

  risks: (->
    theRisks = @get('events').map((item, index, enumerable) ->
      if (item.get('type') is 'medication') or (item.get('type') is 'condition')
        riskLevelAdjustment = 0
        if item.get('isEnd')
          riskLevelAdjustment = -1
        else
          riskLevelAdjustment = 1
        {value: riskLevelAdjustment, effectiveDate: item.get('effectiveDate')}
      else
        # Covers birth
        {value: 0, effectiveDate: item.get('effectiveDate')}
    ).compact().reverse().reduce((previousValue, item) ->
      if previousValue.length > 0
        last = previousValue[previousValue.length - 1]
        if last.effectiveDate == item.effectiveDate
          last.value = item.value + last.value
        else
          previousValue.push(value: item.value + last.value, effectiveDate: item.effectiveDate)
      else
        previousValue.push({value: 0, effectiveDate: item.effectiveDate})
      previousValue
    , Ember.A())
    if theRisks.length > 0
      theRisks.push({value: theRisks[theRisks.length - 1].value, effectiveDate: new Date()})
    theRisks
  ).property('events')

  lastRisk: (->
    @get('risks.firstObject.value')
  ).property('risks')

  computedRisk: (->
    riskTotal = @get('activeMedications.length') + @get('activeConditions.length')
    if riskTotal > 6
      riskTotal = 6
    riskTotal
  ).property('medications', 'conditions')

  categoryDisplay: Ember.computed 'medications', 'observations', 'conditions', 'encounters', ->
    [
      {name: 'medications', title: 'Medications', risk: @get('medications.length'), weight: 1}
      {name: 'conditions', title: 'Conditions', risk: @get('conditions.length'), weight: 2}
      {name: 'readmissions', title: 'Readmissions', risk: @get('readmissions'), weight: 1}
      {name: 'inpatientAdmissions', title: 'Inpatient Admissions', risk: @get('inpatientAdmissions.length'), weight: 1}
      {name: 'utilization', title: 'Utilizations', risk: 5, weight: .5}
      {name: 'social_barriers', title: 'Social Barriers', risk: 2, weight: 1}
      {name: 'falls', title: 'Falls', risk: 1, weight: 1}
      {name: 'emergencyDepartmentAdmissions', title: 'ER Visits', risk: @get('emergencyDepartmentAdmissions.length'), weight: 1}
    ]

  fullName: Ember.computed 'name', ->
    firstHumanName = this.get('name')?.get('firstObject')
    firstHumanName?.get('family') + ', ' + firstHumanName?.get('given')

  computedAge: Ember.computed 'birthDate', ->
    if @get('birthDate')
      moment().diff(moment(@get('birthDate')), 'years')
    else
      Math.round(Math.random() * (92 - 65) + 65)

  activeMedications: Ember.computed.filterBy 'medications', 'active', true

  activeConditions: Ember.computed.filterBy 'conditions', 'active', true

  emergencyDepartmentAdmissions: Ember.computed.filter 'encounters', (item) ->
    item.hasCode('type', {code: "4525004", system:"http://snomed.info/sct"}) and item.inLast('period.start', 60, 'days')

  inpatientAdmissions: Ember.computed.filter 'encounters', (item) ->
    item.hasCode('type', {code: '99221', system: 'http://www.ama-assn.org/go/cpt'}) or
    item.hasCode('type', {code: '99222', system: 'http://www.ama-assn.org/go/cpt'}) or
    item.hasCode('type', {code: '99223', system: 'http://www.ama-assn.org/go/cpt'})
    # is_inpatient = false
    #
    # item.get('type.firstObject.coding')?.forEach (c, i) ->
    #   if c.get('system') == 'http://www.ama-assn.org/go/cpt'
    #     is_inpatient = ['99221', '99222', '99223'].contains(c.get('code'))
    # is_inpatient

  readmissions: Ember.computed 'inpatientAdmissions', ->
    result = @get('inpatientAdmissions').sortBy('period.end').reduce (previousValue, item, index, enumerable) ->
      if previousValue?
        previousValue.count++ if item.sinceDate('period.end', 30, 'days', previousValue.previousAdmission.get('period.end'))
        previousValue.previousAdmission = item
        previousValue
      else
        count: 0, previousAdmission: item
    , null
    result?.count||0

  computedGender: Ember.computed 'gender', ->
    value = @get('gender')?.toString()
    if value == 'M' then 'male'
    else if value == 'F' then 'female'
    else 'other'

  isMale: Ember.computed.equal('computedGender', 'male')
  isFemale: Ember.computed.equal('computedGender', 'female')
  isOtherGender: Ember.computed 'computedGender', ->
    @get('computedGender') != 'male' && @get('computedGender') != 'female'

  computedRiskName: Ember.computed 'computedRisk', ->
    value = @get('computedRisk')
    if value == 1 then '1'
    else if value == 2 then '1+'
    else if value == 3 then '2'
    else if value == 4 then '2+'
    else if value == 5 then '3'
    else '3+'

  riskClassName: Ember.computed 'computedRisk', ->
    'patient-risk-#{@get("computedRisk")}'

  notificationCount: Ember.computed ->
    Math.round(Math.random() * 6)

  hasNotifications: Ember.computed.gt('notificationCount', 0)

  patientLocation: 'Home'

  events: Ember.computed 'medications', 'observations', 'conditions', ->
    events = Ember.A()
    events.pushObject(@store.createRecord('event', {
      event: {startDate: @get('birthDate'), text: "#{@get('fullName')} born."}
    }))
    @get("conditions").forEach (ev) =>
      events.pushObject(@store.createRecord('event', {
        event: ev,
        type: "condition"
      }))
      if ev.get('abatementDate')? and (ev.get('abatementDate') >= ev.get('onsetDate'))
        events.pushObject(@store.createRecord('event', {
          event: ev
          isEnd: true,
          type:"condition"
        }))
    @get("medications").forEach (ev) =>
      console.log ev.get('medication')
      events.pushObject(@store.createRecord('event', {
        event: ev
        isEnd: false,
        type:"medication"
      }))
      if ev.get('whenGiven.end')? and (ev.get('whenGiven.end') >= ev.get('whenGiven.start'))
        events.pushObject(@store.createRecord('event', {
          event: ev
          isEnd: true,
          type:"medication"
        }))
    events.sortBy('effectiveDate').reverse()
)

`export default Patient`
