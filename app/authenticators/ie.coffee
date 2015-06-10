`import Ember from 'ember'`

IEAuthenticator = SimpleAuth.Authenticators.Base.extend({
  tokenEndpoint: '/v4/session'
  restore: (data) ->
    new (Ember.RSVP.Promise)((resolve, reject) ->
      if !Ember.isEmpty(data.token)
        resolve data
      else
        reject()
      return
)
  authenticate: (credentials) ->
    _this = this
    new (Ember.RSVP.Promise)((resolve, reject) ->
      Ember.$.ajax(
        url: _this.tokenEndpoint
        type: 'POST'
        data: JSON.stringify(session:
          identification: credentials.identification
          password: credentials.password)
        contentType: 'application/json').then ((response) ->
        Ember.run ->
          resolve token: response.session.token
          return
        return
      ), (xhr, status, error) ->
        response = JSON.parse(xhr.responseText)
        Ember.run ->
          reject response.error
          return
        return
      return
)
  invalidate: ->
    _this = this
    new (Ember.RSVP.Promise)((resolve) ->
      Ember.$.ajax(
        url: _this.tokenEndpoint
        type: 'DELETE').always ->
        resolve()
        return
      return
)
})

`export default IEAuthenticator`
