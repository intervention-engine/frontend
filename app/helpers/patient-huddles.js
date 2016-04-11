import { helper } from 'ember-helper';

export function patientHuddles([huddles, patient]) {
  return huddles.filter((huddle) => huddle.hasPatient(patient));
}

export default helper(patientHuddles);
