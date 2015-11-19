import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

export default PagedRemoteArray.extend({
  page: 1,
  totalPages: 0,

  getPage: function(){
    return (this.get('page') - 1 || 0) * this.get('perPage');
  },

  totalPagesBinding: "total",

  rawFindFromStore: function() {
    var store = this.get('store');
    var modelName = this.get('modelName');
    var ops = this.get('paramsForBackend');
    var res = store.findQuery(modelName, ops);
    let perPage = this.get('perPage');
    let self = this;
    res.then(function(rows){
      self.set('totalPages', Math.ceil(rows.meta['total']/perPage));
    });
    return res;
},


});
