import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('human-name', {
  default: {given: "Tom", family:"Bombadil"},
  traits: {
      male: {given: "Donald"},
      female: {given: "Daisy"}
  }

});
