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

Condition = DS.Model.extend(
  identifier: DS.hasMany('identifier', {embedded: true}),
  subject: DS.belongsTo('resource-reference', {embedded: true}),
  encounter: DS.belongsTo('resource-reference', {embedded: true}),
  asserter: DS.belongsTo('resource-reference', {embedded: true}),
  dateAsserted: DS.attr('date'),
  code: DS.belongsTo('codeable-concept', {embedded: true}),
  category: DS.belongsTo('codeable-concept', {embedded: true}),
  status: DS.attr('string'),
  certainty: DS.belongsTo('codeable-concept', {embedded: true}),
  severity: DS.belongsTo('codeable-concept', {embedded: true}),
  onsetDateTime: DS.attr('date'),
  abatementDateTime: DS.attr('date'),
  abatementBoolean: DS.attr('boolean'),
  location: DS.hasMany('location', {embedded: true}),
  notes: DS.attr('string')

  text: (->
    @get('code.text')?.match(/:\s+([^(]+)\s+\(/)?[1]||@get('code.text')
  ).property('code')

  startDate: Em.computed('onsetDate', -> @get('onsetDate'))
  endDate: Em.computed('abatementDate', -> @get('abatementDate'))

  active: (->
    not @get('abatementDate')? or (@get('abatementDate') > new Date())
  ).property('abatementDate')
)

`export default Condition`
