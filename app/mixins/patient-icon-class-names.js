import Ember from 'ember';

export default Ember.Mixin.create({
  genderIconClassName: Ember.computed('patient.computedGender', function() {
    let gender = this.get('patient.computedGender');

    if (gender === 'Male') {
      return 'fa-male';
    } else if (gender === 'Female') {
      return 'fa-female';
    }

    return 'fa-user';
  }),

  ageIconClassName: Ember.computed('patient.computedAge', function() {
    let age = this.get('patient.computedAge');

    if (age <= 3) {
      return 'icon-baby';
    } else if (age <= 17) {
      return 'icon-child';
    } else if (age <= 64) {
      return 'icon-adult';
    } else if (age >= 65) {
      return 'icon-elderly';
    }

    return 'fa fa-birthday-cake';
  })
});
