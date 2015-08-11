`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend(
  displayNavbarService: Ember.inject.service('display-navbar')

  displayNavbar: Ember.computed.reads('displayNavbarService.displayNavbar')
)

`export default ApplicationController`
