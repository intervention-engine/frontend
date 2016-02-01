import DS from 'ember-data';
import SelectableMixin from '../mixins/selectable';
import Group from 'ember-fhir-adapter/models/group';

export default Group.extend(SelectableMixin, {
  groupList: DS.belongsTo('group-list', { async: true })
});
