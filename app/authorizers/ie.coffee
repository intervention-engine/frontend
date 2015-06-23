`import Ember from 'ember'`
`import Base from 'simple-auth/authorizers/base';`

IEAuthorizer = Base.extend(
  authorize: (jqXHR, requestOptions) ->
    if @get('session.isAuthenticated') and !Ember.isEmpty(@get('session.secure.token'))
      jqXHR.setRequestHeader 'Authorization', @get('session.secure.token')
    return
)

`export default IEAuthorizer`
