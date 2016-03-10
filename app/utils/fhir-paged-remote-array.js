import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import computed from 'ember-computed';

export default PagedRemoteArray.extend({
  page: 1,
  totalPages: 0,

  sortBy: null,
  sortDescending: null,
  groupId: null,

  getPage() {
    return (this.get('page') - 1 || 0) * this.get('perPage');
  },

  sortParams: computed('sortBy', 'sortDescending', {
    get() {
      let sortBy = this.get('sortBy');
      let sortDescending = this.get('sortDescending');

      if (sortBy == null) {
        return {};
      }

      let sortDir = sortDescending ? 'desc' : 'asc';
      return {
        [`_sort:${sortDir}`]: sortBy
      };
    }
  }),

  groupParams: computed('groupId', {
    get() {
      let groupId = this.get('groupId')
      return groupId?{'_query':'group', 'groupId': groupId}:{}
    }
  }),

  totalPagesBinding: 'total',

  rawFindFromStore() {
    let store = this.get('store');
    let modelName = this.get('modelName');
    let ops = Object.assign({}, this.get('sortParams'), this.get('paramsForBackend'), this.get('groupParams'));

    let res = store.query(modelName, ops);
    let perPage = this.get('perPage');

    return res.then((rows) => {
      this.set('totalPages', Math.ceil(rows.meta.total / perPage));

      return rows;
    });
  }
});
