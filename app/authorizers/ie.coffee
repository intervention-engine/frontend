`import Ember from 'ember'`

IEAuthorizer = SimpleAuth.Authorizers.Base.extend(
  authorize: (jqXHR, requestOptions) ->
    if @get('session.isAuthenticated') and !Ember.isEmpty(@get('session.secure.token'))
      jqXHR.setRequestHeader 'Authorization', 'Token: ' + @get('session.secure.token')
    return
)

`export default IEAuthorizer`
