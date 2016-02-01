import Ajax from 'ember-ajax/services/ajax';
import service from 'ember-service/inject';
import computed from 'ember-computed';
import { AjaxError } from 'ember-ajax/errors';

class ApiError extends AjaxError {
  constructor(errors, detailedMessage, payload) {
    super(errors, detailedMessage);
    this.payload = payload;
  }
}

export default Ajax.extend({
  session: service(),

  authorizer: 'authorizer:ie',

  headers: computed({
    get() {
      let headers = {};

      if (this.get('session.isAuthenticated')) {
        this.get('session').authorize(this.get('authorizer'), (headerName, headerValue) => {
          headers[headerName] = headerValue;
        });
      }

      return headers;
    }
  }).volatile(),

  handleResponse(status, headers, payload/*, requestData */) {
    payload = payload || {};

    if (this.isSuccess(status, headers, payload)) {
      return payload;
    }

    let errors = this.normalizeErrorResponse(status, headers, payload);

    return new ApiError(errors, '', payload);
  }
});
