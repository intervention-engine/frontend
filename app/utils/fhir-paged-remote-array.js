import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import computed from 'ember-computed';

export default PagedRemoteArray.extend({
  page: 1,
  totalPages: 0,
  sortBy: null,
  sortDescending: false,
  groupId: null,
  patientIds: [],

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

      let sortDir = sortDescending ? '-' : '';
      return {
        _sort: `${sortDir}${sortBy}`
      };
    }
  }),

  patientIdParams: computed('patientIds.[]', {
    get() {
      let patientIds = this.get('patientIds');
      if (patientIds == null || patientIds.length === 0) {
        return {};
      }

      return { _id: patientIds.join(',') };
    }
  }),

  otherParams: computed('groupId', {
    get() {
      let groupId = this.get('groupId');
      return groupId ? { '_query': 'group', groupId } : {};
    }
  }),

  totalPagesBinding: 'total',

  rawFindFromStore() {
    let store = this.get('store');
    let modelName = this.get('modelName');
    let res = store.query(modelName, Object.assign({ _offset: this.get('paramsForBackend._offset'), _count: this.get('paramsForBackend._count') }, this.get('otherParams'), this.get('patientIdParams'), this.get('sortParams')));
    let perPage = this.get('perPage');

    return res.then((rows) => {
      this.set('totalPages', Math.ceil(rows.meta.total / perPage));
      return rows;
    });
  }
});
