`import Ember from 'ember'`

FiltersNewController = Ember.Controller.extend({
  # returns true if filter description has at least 1 filter pane and false if not
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')

  # # resizes filter-type and filter-description height to be equal
  # filterType: Ember.$(".filter-type-panel")               # gets the filter-type dom element
  # filterDescription: Ember.$("filter-description-panel")  # gets the filter-description dom element
  # typeHeight: filterType.height
  # descriptionHeight: filterDescription.height

  # resizeFn: (->
  #   if typeHeight > descriptionHeight
  #     descriptionHeight("option", "height", typeHeight)
  #   else
  #     typeHeight("option", "height", descriptionHeight)
  # ).property('typeHeight','descriptionHeight')
    # height = Ember.$(window).height()                     # gets the height of the browser window
    # filterTypeOffset = filterType.offset()                # gets the coordinates of the filter-type element
    # filterType.height(height - filterTypeOffset.top - 16) # sets the height of the filter-type element
    # filterDescriptionOffset = filterDescription.offset()  # gets the coordinates of the main calendar
    # filterDescription.height("option", "height", height - calendarOffset.top - 16) # sets the height of the calendar
})

`export default FiltersNewController`
