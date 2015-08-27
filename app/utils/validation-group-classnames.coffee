validatedClassNames = (field) ->
  Ember.computed('displayErrors', "errors.#{field}.length", ->
    classNames = []
    if @get("errors.#{field}.length") == 0
      classNames.push('has-success')
    else if @get('displayErrors')
      classNames.push('has-error')

    classNames.push('has-feedback') if classNames.length
    classNames.join(' ')
  )

`export default validatedClassNames`
