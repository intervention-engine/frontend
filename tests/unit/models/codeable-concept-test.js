import { moduleForModel, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleForModel('codeable-concept', 'Unit | Model | codeable-concept', {
  // Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept',
        'model:location', 'model:period', 'model:coding',
        'model:reference', 'model:quantity', 'model:range',
        'model:condition-stage-component',
        'model:condition-evidence-component']
});

test('a codeable-concept.coding with a display has the correct displayText', function(assert) {
  let model = this.subject();
  let store = this.store();
  run(() => {
    let coding = store.createRecord('coding', {
      'system': 'http://www.ama-assn.org/go/cpt',
      'code': '99201',
      'display': 'Outpatient Encounter'
    });
    model.get('coding').pushObject(coding);
    assert.equal(model.get('displayText'), 'Outpatient Encounter');
  });
});

test('a codeable-concept with a text has the correct displayText', function(assert) {
  let model = this.subject({ 'text': 'My Encounter' });
  assert.equal(model.get('displayText'), 'My Encounter');
});

test('a codeable-concept.coding without a display has the correct displayText', function(assert) {
  let model = this.subject();
  let store = this.store();
  run(() => {
    let coding = store.createRecord('coding', {
      'system': 'http://www.ama-assn.org/go/cpt',
      'code': '99201'
    });
    model.get('coding').pushObject(coding);
    assert.equal(model.get('displayText'), 'CPT 99201');
  });
});