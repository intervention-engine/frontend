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

Observation = DS.Model.extend(
  name: DS.belongsTo('codeable-concept')
  valueQuantity: DS.belongsTo('quantity')
  valueCodeableConcept: DS.belongsTo('codeable-concept')
  valueDateTime: DS.attr('date')
  valuePeriod: DS.belongsTo('period')
  valueString: DS.attr('string')
  interpretation: DS.belongsTo('codeable-concept')
  comments: DS.attr('string')
  appliesDateTime: DS.attr('date')
  appliesPeriod: DS.belongsTo('period')
  issued: DS.attr('date')
  status: DS.attr('string')
  reliability: DS.attr('string')
  bodySite: DS.belongsTo('codeable-concept')
  method: DS.belongsTo('codeable-concept')
  identifier: DS.belongsTo('identifier')
  subject: DS.belongsTo('reference')
  specimen: DS.belongsTo('reference')
  performer: DS.hasMany('reference')
  encounter: DS.belongsTo('reference')

  isCoded: (system, code) ->
    return @get('name.coding').mapBy('code').indexOf(code) > -1

  text: (->
    if @get('name.text') != ""
      @get('name.text').match(/:\s+([^(]+)\s+\(/)[1]
    else
      ""
  ).property('name')
)

`export default Observation`
