`import Ember from 'ember'`

NavbarActiveLinkComponent = Ember.Component.extend(
  tagName: 'li'
  classNameBindings: ['active']

  active: (->
    @get('childViews.firstObject.active')
  ).property('childViews.firstObject.active')
)

`export default NavbarActiveLinkComponent`
