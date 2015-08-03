import CodeableMixin from '../mixins/codeable';
import DateableMixin from '../mixins/dateable';
import Encounter from 'ember-fhir-adapter/models/encounter';

let IEEncounter = Encounter.extend(CodeableMixin, DateableMixin);

export default IEEncounter;
