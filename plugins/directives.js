import Vue from 'vue';

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});
Vue.directive('phone-mask', {
  bind: el => {
    el.oninput = function(e) {
      if (!e.isTrusted) return;
      const x = this.value.replace(/\D/g, '').match(/(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      let v = '';
      if (x && x[2]) {
        const arrTemp = x[2].split('');
        arrTemp[0] = 9;
        x[2] = arrTemp.join('');
      }
      if (x && x[1]) {
        if (String(x[1]).startsWith('8')) {
          v += x[2] ? '8 (' + x[2] : '8';
        } else if (String(x[1]).startsWith('7')) {
          v += x[2] ? '+7 (' + x[2] : '+7';
        } else {
          v += x[2] ? '+7 (9 ' + x[2] : '+7 (9';
        }
        v += x[3] ? ') ' + x[3] : '';
        v += x[4] ? '-' + x[4] : '';
        v += x[5] ? '-' + x[5] : '';
      }
      this.value = v;
      el.dispatchEvent(new Event('input'));
    };
  },
});
