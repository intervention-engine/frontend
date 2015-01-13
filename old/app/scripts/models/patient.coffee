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


App.Patient = DS.Model.extend
    identifier: DS.hasMany('identifier')
    name: DS.hasMany('humanName')
    telecom: DS.hasMany('contactPoint')
    gender: DS.attr('string')
    birthDate: DS.attr('date')
    deceasedBoolean: DS.attr('boolean')
    deceasedDateTime: DS.attr('date')
    address: DS.hasMany('address')
    maritalStatus: DS.belongsTo('codeableConcept')
    multipleBirthBoolean: DS.attr('boolean')
    multipleBirthInteger: DS.attr()
    photo: DS.hasMany('attachment')
    contact: DS.hasMany('contact')
    animal: DS.belongsTo('animal')
    communication: DS.hasMany('codeableConcept')
    careProvider: DS.hasMany('reference')
    managingOrganization: DS.belongsTo('reference')
    link: DS.hasMany('link')
    active: DS.attr('boolean')

App.PatientSerializer = App.ApplicationSerializer.extend
    attrs:
        identifier : {embedded: 'always'}
        name : {embedded: 'always'}
        telecom : {embedded: 'always'}
        address : {embedded: 'always'}
        maritalStatus : {embedded: 'always'}
        photo : {embedded: 'always'}
        contact : {embedded: 'always'}
        animal : {embedded: 'always'}
        communication : {embedded: 'always'}
        careProvider : {embedded: 'always'}
        managingOrganization : {embedded: 'always'}
        link : {embedded: 'always'}













# This is an ugly hack to deal with embedded structures in the spec contact
App.Contact = DS.Model.extend
    relationship: DS.hasMany('codeableConcept')
    name: DS.belongsTo('humanName')
    telecom: DS.hasMany('contactPoint')
    address: DS.belongsTo('address')
    gender: DS.attr('string')
    organization: DS.belongsTo('reference')


App.ContactSerializer = App.ApplicationSerializer.extend
    attrs:
        relationship : {embedded: 'always'}
        name : {embedded: 'always'}
        telecom : {embedded: 'always'}
        address : {embedded: 'always'}
        organization : {embedded: 'always'}
# This is an ugly hack to deal with embedded structures in the spec animal
App.Animal = DS.Model.extend
    species: DS.belongsTo('codeableConcept')
    breed: DS.belongsTo('codeableConcept')
    genderStatus: DS.belongsTo('codeableConcept')


App.AnimalSerializer = App.ApplicationSerializer.extend
    attrs:
        species : {embedded: 'always'}
        breed : {embedded: 'always'}
        genderStatus : {embedded: 'always'}



# This is an ugly hack to deal with embedded structures in the spec link
App.Link = DS.Model.extend
    other: DS.belongsTo('reference')
    type: DS.attr('string')


App.LinkSerializer = App.ApplicationSerializer.extend
    attrs:
        other : {embedded: 'always'}
