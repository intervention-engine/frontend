`import Ember from 'ember'`

FormValidationTooltipComponent = Ember.Component.extend(
  tagName: 'i'

  attributeBindings: ['ariaHidden:aria-hidden']
  classNames: ['form-control-feedback', 'form-control-feedback-clear']
  classNameBindings: ['iconClassNames']
  ariaHidden: true

  errors: Ember.computed(->)

  displayErrors: false

  iconClassNames: Ember.computed('displayErrors', 'errors.length', ->
    classNames = []

    if @get('errors').length == 0
      classNames.push('fa-check')
    else if @get('displayErrors')
      classNames.push('fa-times')

    classNames.unshift('fa') if classNames.length > 0

    classNames.join(' ')
  )

  errorMessages: Ember.computed('errors.[]', ->
    @get('errors').join('; ')
  )

  _setup: Ember.on('didInsertElement', ->
    @$().tooltip({
      container: document.body
      placement: 'right'
      title: =>
        return '' unless @get('displayErrors')

        @get('errorMessages')
    })
  )

  _teardown: Ember.on('willDestroyElement', ->
    return if @isDestroyed

    @$().tooltip('destroy')
  )
)

`export default FormValidationTooltipComponent`
