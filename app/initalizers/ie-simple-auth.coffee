`import IEAuthorizer from '../authorizers/ie'`
`import IEAuthenticator from '../authenticators/ie'`

# Takes two parameters: container and app
initialize = (container) ->
  container.register('authorizer:ie', IEAuthorizer)
  container.register('authenticator:ie', IEAuthenticator)
  return

IESimpleAuthInitializer =
  name: 'ie-simple-auth'
  before: 'simple-auth'
  initialize: initialize

`export {initialize}`
`export default IESimpleAuthInitializer`
