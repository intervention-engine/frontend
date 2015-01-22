`import Ember from 'ember'`

IndexController = Em.Controller.extend
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.length')
  results: (->
    items = @get('selectedItems')
    if items.length > 0
      for item in items
        if item.get("query.results")?
          continue
        console.log "URL:#{item.get("url")}"
        promise = DS.PromiseObject.create({promise: $.get(item.get("url"))})
        promise.then(()=>
          _this.set('query', promise.content)
          )
    ).observes('selectedItems.length')

`export default IndexController`
