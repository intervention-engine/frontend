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
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
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
`import CodeableMixin from '../mixins/codeable'`
`import DateableMixin from '../mixins/dateable'`

Encounter = DS.Model.extend(CodeableMixin, DateableMixin,
  identifier: DS.hasMany('identifier', {embedded: true}),
  status: DS.attr('string'),
  "class": DS.attr('string'),
  type: DS.hasMany('codeable-concept', {embedded: true}),
  patient: DS.belongsTo('reference', {embedded: true}),
  participant: DS.hasMany('participant', {embedded: true}),
  fulfills: DS.belongsTo('reference', {embedded: true}),
  period: DS.belongsTo('period', {embedded: true}),
  # length: DS.belongsTo('duration', {embedded: true}),
  reason: DS.hasMany('codeable-concept', {embedded: true}),
  indication: DS.hasMany('reference', {embedded: true}),
  priority: DS.belongsTo('codeable-concept', {embedded: true}),
  hospitalization: DS.belongsTo('hospitalization', {embedded: true}),
  location: DS.hasMany('location', {embedded: true}),
  serviceProvider: DS.belongsTo('reference', {embedded: true}),
  partOf: DS.belongsTo('resource-reference', {embedded: true}),
  episodeOfCare: DS.belongsTo('reference', {embedded: true}),
  incomingReferralRequest: DS.hasMany('reference', {embedded: true}),
  # statusHistory: DS.hasMany('status-history', {embedded: true})

  text: (->
    @get('type.firstObject.text')?.match(/:\s+([^(]+)\s+\(/)?[1]||@get('code.firstObject.text')
  ).property('type')

  startDate: Em.computed('period.start', -> @get('period.start'))
  endDate: Em.computed('period.end', -> @get('period.end'))

)

`export default Encounter`
