App.RadioButtonComponent = Ember.Component.extend
    tagName: 'input'

    attributeBindings: ['type', 'checked']

    type: 'radio'

    checked: (() ->
        @get('value') == @get('name');
    ).property('value', 'name'),

    click: ->
        @set('name', @get('value'));
