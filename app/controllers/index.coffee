`import Ember from 'ember'`

IndexController = Em.Controller.extend
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  # fetchResults: (->
  #   items = @get('selectedItems')
  #   # @set('loadedPopulations', Em.A([]))
  #   if items.length > 0
  #     for item in items
  #       console.log item.get("url")
  #       item.set("query", @store.find('query', item.get("url")))
        # # if item.get("query.results")?
        # #   continue
        # console.log "URL:#{item.get("url")}"
        # # promise = DS.PromiseObject.create({promise: $.get(item.get("url"))})
        # promise.then(()=>
        #   _this.set('query', promise.content)
        #   # _this.send('updateTotals', promise.content)
        #   )
    # ).observes('selectedItems.[]')
  # loadedPopulations: Em.A([])
  # actions:
  #   updateTotals:(population)->
  #     debugger

`export default IndexController`
