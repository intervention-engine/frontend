`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend(
  location: config.locationType
)

Router.map(->
  @resource('filters', ->
    @route('new')
    @route('show', path: ':id')
  )
  @resource('patients', ->
    @route('show', path: ':id')
  )
)

`export default Router`
