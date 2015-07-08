`import Ember from 'ember'`

IeNavbarComponent = Ember.Component.extend(
  logoURL: "/assets/images/logo.png"
  logoLargeURL: "/assets/images/logo-darkbg-lg.png"
  actions: invalidateSession: ->
    @get('session').invalidate()
    return
)

`export default IeNavbarComponent`
