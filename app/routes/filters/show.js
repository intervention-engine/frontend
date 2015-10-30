import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    return this.store.find('group', params.id)
  },

  renderTemplate: function(){
    this.render("filters.new");
  }


  //
  // # resets the controller upon exiting route
  // resetController: (controller, isExiting, transition) ->
  //   controller.set('filterName', null) if isExiting
  //   return
});
