`import Ember from 'ember'`
`import Base from 'simple-auth/authenticators/base'`

IEAuthenticator = Base.extend({
  tokenEndpoint: '/login',

  restore: (data) ->
    new Ember.RSVP.Promise((resolve, reject) ->
      if !Ember.isEmpty(data.token)
        resolve(data)
      else
        reject()
      return
    )

  authenticate: (credentials) ->
    return new Ember.RSVP.Promise((resolve, reject) =>
      Ember.$.ajax({
        url:         @get('tokenEndpoint'),
        type:        'POST',
        data:        JSON.stringify({ session: { identification: credentials.identification, password: credentials.password } }),
        contentType: 'application/json',
        dataType: 'json'
      }).then((response) ->
        Ember.run(-> resolve({ token: response.session.token }))
      , (xhr) ->
        response = JSON.parse(xhr.responseText)
        Ember.run(-> reject(response.error))
      )
    )

  invalidate: ->
    return new Ember.RSVP.Promise((resolve) =>
      Ember.$.ajax({ url: @get('tokenEndpoint'), type: 'DELETE' }).always(-> resolve())
    )
})

`export default IEAuthenticator`
