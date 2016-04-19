import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  sortDescending: false,
  sortBy: 'riskScore',

  sortOptions: computed({
    get() {
      return [
        { name: 'Name', sortKey: 'name,birthdate', sortIcon: 'alpha' },
        { name: 'Age', sortKey: 'birthdate,name', sortIcon: 'numeric', invert: true },
        { name: 'Gender', sortKey: 'gender,name', sortIcon: 'alpha' },
        { name: 'Location', sortKey: 'address,name', sortIcon: 'alpha' },
        { name: 'Risk Score', sortKey: 'riskScore,name', sortIcon: 'numeric', defaultSortDescending: true },
        { name: 'Notifications', sortKey: 'notifications,name', sortIcon: 'numeric', defaultSortDescending: true }
      ];
    }
  })
});
