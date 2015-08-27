`import Ember from 'ember'`

DisplayNavbarService = Ember.Service.extend({
  displayNavbar: true

  show: ->
    @set('displayNavbar', true)

  hide: ->
    @set('displayNavbar', false)
})

`export default DisplayNavbarService`
