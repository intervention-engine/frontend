import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  sortDescending: false,
  sortBy: 'riskScore',

  sortOptions: computed({
    get() {
      return [
        { name: 'Name', sortKey: 'name', sortIcon: 'alpha' },
        { name: 'Age', sortKey: 'age', sortIcon: 'numeric' },
        { name: 'Gender', sortKey: 'gender', sortIcon: 'alpha' },
        { name: 'Location', sortKey: 'location', sortIcon: 'alpha' },
        { name: 'Risk Score', sortKey: 'riskScore', sortIcon: 'numeric', defaultSortDescending: true },
        { name: 'Notifications', sortKey: 'notifications', sortIcon: 'numeric', defaultSortDescending: true }
      ];
    }
  })
});
