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
`import SelectableMixin from '../mixins/selectable'`

Filter = DS.Model.extend(SelectableMixin,
  name: DS.attr("string")
  description: DS.attr("string")
  query: DS.belongsTo("query")
  panes: DS.hasMany("pane")
  patients: DS.belongsTo("queryList", { async: true })
  patientsCount: (-> @get('patients').length).property('patients.[]')
  results: DS.attr("number")



  computeInstaCount: (->
    pats = Ember.$.post("/InstaCount/patient",  JSON.stringify(@get('query')?.serialize()||{}))

    pats.fail (=>
      _this.set('instaPatient', 0)
    )

    pats.then ((res)=>
      val = JSON.parse(res).total
      _this.set('instaPatient', val)
    )

    encounters = Ember.$.post("/InstaCount/encounter",  JSON.stringify(@get('query')?.serialize()||{}))

    encounters.fail (=>
      _this.set('instaEncounter', 0)
    )

    encounters.then ((res)=>
      val = JSON.parse(res).total
      _this.set('instaEncounter', val)
    )


    conds = Ember.$.post("/InstaCount/condition",  JSON.stringify(@get('query')?.serialize()||{}))

    conds.fail (=>
      _this.set('instaCondition', 0)
    )

    conds.then ((res)=>
      val = JSON.parse(res).total
      _this.set('instaCondition', val)
    )
  ).observes('query').on('init')

  instaPatient: ( ->
    @get('query')
  ).property('computeInstaCount')

  instaEncounter: ( ->
  ).property('computeInstaCount')

  instaCondition: ( ->
  ).property('computeInstaCount')

  buildQuery: (->
    items = @get('panes').mapBy('activeParameters').reduce(((prev, cur) -> prev.concat(cur)), [])
    constructedQuery = @store.createRecord("query", {})
    constructedQuery.get('parameter').pushObjects(items)
    @set('query',constructedQuery)
  ).observes('panes.@each.activeParameters')

  hasFilterPane: (->
    @get('panes.length') > 0
  ).property('panes.length')



  checkboxId: (->
    "checkbox-population-#{@get('id')}"
  ).property('id')
)

`export default Filter`
