import IEAuthorizer from '../authorizers/ie';
import IEAuthenticator from '../authenticators/ie';

export function initialize(container, application) {
  application.register('authorizer:ie', IEAuthorizer);
  application.register('authenticator:ie', IEAuthenticator);
}

export default {
  name: 'ie-simple-auth',
  before: 'simple-auth',
  initialize
};
