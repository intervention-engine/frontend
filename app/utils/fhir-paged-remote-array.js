import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import computed from 'ember-computed';

export default PagedRemoteArray.extend({
  page: 1,
  totalPages: 0,

  getPage() {
    return (this.get('page') - 1 || 0) * this.get('perPage');
  },

  totalPagesBinding: 'total',

  rawFindFromStore() {
    let store = this.get('store');
    let modelName = this.get('modelName');
    let res = store.query(modelName, Object.assign({}, this.get('paramsForBackend'), this.get('otherParams')));

    let perPage = this.get('perPage');

    return res.then((rows) => {
      this.set('totalPages', Math.ceil(rows.meta.total / perPage));

      return rows;
    });
  }
});
