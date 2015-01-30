`import Ember from 'ember'`

LoginController = Ember.Controller.extend(
  needs: ["application"]
  logoURL: Ember.computed.oneWay("controllers.application.logoURL")
  logoLargeURL: Ember.computed.oneWay("controllers.application.logoLargeURL")

  currentVersion: "1.0.0"
)

`export default LoginController`
