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


App.Encounter = DS.Model.extend
    identifier: DS.hasMany('identifier')
    status: DS.attr('string')
    class: DS.attr('string')
    type: DS.hasMany('codeableConcept')
    subject: DS.belongsTo('resourceReference')
    participant: DS.hasMany('participant')
    fulfills: DS.belongsTo('resourceReference')
    period: DS.belongsTo('period')
    length: DS.belongsTo('quantity')
    reason: DS.belongsTo('codeableConcept')
    indication: DS.belongsTo('resourceReference')
    priority: DS.belongsTo('codeableConcept')
    hospitalization: DS.belongsTo('hospitalization')
    location: DS.hasMany('location')
    serviceProvider: DS.belongsTo('resourceReference')
    partOf: DS.belongsTo('resourceReference')

App.EncounterSerializer = App.ApplicationSerializer.extend

    attrs:
        identifier : {embedded: 'always'}
        type : {embedded: 'always'}
        subject : {embedded: 'always'}
        participant : {embedded: 'always'}
        fulfills : {embedded: 'always'}
        period : {embedded: 'always'}
        length : {embedded: 'always'}
        reason : {embedded: 'always'}
        indication : {embedded: 'always'}
        priority : {embedded: 'always'}
        hospitalization : {embedded: 'always'}
        location : {embedded: 'always'}
        serviceProvider : {embedded: 'always'}
        partOf : {embedded: 'always'}








# This is an ugly hack to deal with embedded structures in the spec participant
App.Participant = DS.Model.extend
    type: DS.hasMany('codeableConcept')
    individual: DS.belongsTo('resourceReference')


App.ParticipantSerializer = App.ApplicationSerializer.extend
    attrs:
        type : {embedded: 'always'}
        individual : {embedded: 'always'}






# This is an ugly hack to deal with embedded structures in the spec hospitalization
App.Hospitalization = DS.Model.extend
    preAdmissionIdentifier: DS.belongsTo('identifier')
    origin: DS.belongsTo('resourceReference')
    admitSource: DS.belongsTo('codeableConcept')
    period: DS.belongsTo('period')
    accomodation: DS.hasMany('accomodation')
    diet: DS.belongsTo('codeableConcept')
    specialCourtesy: DS.hasMany('codeableConcept')
    specialArrangement: DS.hasMany('codeableConcept')
    destination: DS.belongsTo('resourceReference')
    dischargeDisposition: DS.belongsTo('codeableConcept')
    dischargeDiagnosis: DS.belongsTo('resourceReference')
    reAdmission: DS.attr('boolean')


App.HospitalizationSerializer = App.ApplicationSerializer.extend
    attrs:
        preAdmissionIdentifier : {embedded: 'always'}
        origin : {embedded: 'always'}
        admitSource : {embedded: 'always'}
        period : {embedded: 'always'}
        accomodation : {embedded: 'always'}
        diet : {embedded: 'always'}
        specialCourtesy : {embedded: 'always'}
        specialArrangement : {embedded: 'always'}
        destination : {embedded: 'always'}
        dischargeDisposition : {embedded: 'always'}
        dischargeDiagnosis : {embedded: 'always'}
# This is an ugly hack to deal with embedded structures in the spec location
App.Location = DS.Model.extend
    location: DS.belongsTo('resourceReference')
    period: DS.belongsTo('period')

App.LocationSerializer = App.ApplicationSerializer.extend
    attrs:
        location : {embedded: 'always'}
        period : {embedded: 'always'}

App.Accomodation = DS.Model.extend
  bed: DS.belongsTo("resourceReference")
  period: DS.belongsTo("period")

App.AccomodationSerializer = App.ApplicationSerializer.extend
  attrs:
    bed: {embedded: 'always'}
    period: {embedded: 'always'}
