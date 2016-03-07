import $ from 'jquery';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import layout from '../templates/components/bootstrap-modal';
import computed from 'ember-computed';
import { next } from 'ember-runloop';

export default ModalDialog.extend({
  layout,

  hasOverlay: true,
  clickOutsideToClose: true,
  containerClassNames: ['modal', 'fade'],
  overlayClassNames: ['modal-backdrop', 'fade'],
  extraClasses: '',
  disableClickToClose: false,
  showCloseButton: true,
  targetAttachment: null,

  title: '',
  hasNoTitle: computed.empty('title'),

  didInsertElement() {
    this._registerClickHandler();
    this._addEscListener();
    next(this, animateModalIn);

    $(document.body).addClass('modal-open');

    callAttrFunction(this.attrs.onOpen);
  },

  willDestroyElement() {
    this._removeEscListener();
    $(document.body).removeClass('modal-open');
    this._super(...arguments);
  },

  _addEscListener() {
    $(document.body).on('keyup.modal-dialog', (event) => {
      if (this.get('disableClickToClose')) {
        return;
      }

      if (event.keyCode === 27) {
        this.send('close');
      }
    });
  },

  _removeEscListener() {
    $(document.body).off('keyup.modal-dialog');
  },

  _registerClickHandler() {
    let handleClick = (event) => {
      if (!this.get('clickOutsideToClose') || this.get('disableClickToClose')) {
        return;
      }

      if (!$(event.target).closest('.modal-dialog').length) {
        this.send('close');
      }
    };
    let registerClick = () => $(document).on('click.ember-modal-dialog', handleClick);

    // setTimeout needed or else the click handler will catch the click that spawned this modal dialog
    setTimeout(registerClick);
  },

  actions: {
    close() {
      callAttrFunction(this.attrs.onClose);
    }
  }
});

function animateModalIn() {
  $('.modal').addClass('in');
  $('.modal-backdrop').addClass('in');
}

function callAttrFunction(fn) {
  if (fn && $.isFunction(fn)) {
    fn();
  }
}
