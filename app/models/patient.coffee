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

Patient = DS.Model.extend(
  identifier: DS.hasMany('identifier')
  name: DS.hasMany('human-name')
  telecom: DS.hasMany('contact-point')
  gender: DS.attr('string')
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

  fullName: Ember.computed 'name', ->
    firstHumanName = this.get('name').get('firstObject')
    return firstHumanName.get('given') + ' ' + firstHumanName.get('family')
)

`export default Patient`
