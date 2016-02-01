import computed from 'ember-computed';

export default function validatedClassNames(field) {
  return computed('displayErrors', `errors.${field}.length`, function() {
    let classNames = [];

    if (this.get(`errors.${field}.length`) === 0) {
      classNames.push('has-success');
    } else if (this.get('displayErrors')) {
      classNames.push('has-error');
    }

    if (classNames.length) {
      classNames.push('has-feedback');
    }

    return classNames.join(' ');
  });
}
