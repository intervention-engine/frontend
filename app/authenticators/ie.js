import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import service from 'ember-service/inject';
import run from 'ember-runloop';
// import RSVP from 'rsvp';
import { isEmpty } from 'ember-utils';

const { RSVP: { Promise } } = Ember;

export default Base.extend({
  ajax: service(),

  tokenEndpoint: '/auth',

  restore(data) {
    return new Promise(function(resolve, reject) {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(identification, password) {
    return new Promise((resolve, reject) => {
      let request = this.get('ajax').request(this.get('tokenEndpoint'), {
        type: 'POST',
        data: JSON.stringify({
          session: { identification, password }
        }),
        contentType: 'application/json',
        dataType: 'json'
      });

      request.then((response) => {
        run(() => {
          resolve({
            token: response.session.token
          });
        });
      });

      request.catch((error) => {
        let response = error.payload;
        run(() => {
          reject(response.error);
        });
      });
    });
  },

  invalidate() {
    return new Promise((resolve) => {
      this.get('ajax').request(this.get('tokenEndpoint'), { type: 'DELETE' }).then(resolve, resolve);
    });
  }
});
