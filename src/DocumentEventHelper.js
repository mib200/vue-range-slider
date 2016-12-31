// @flow
/* global document */
var inBrowser = typeof window !== 'undefined';
export default {
	created() {
		if (inBrowser) {
			forEachListener(this, (key, listener) => {
				document.addEventListener(key, listener)
			});
		}
	},

	beforeDestroy() {
		if (inBrowser) {
			forEachListener(this, (key, listener) => {
				document.removeEventListener(key, listener)
			});
		}
	}
};

function forEachListener(vm, f) {
  var events = vm.$options.events;
  Object.keys(events).forEach(function (key) {
    f(key, function (event) {
      return events[key].call(vm, event);
    });
  });
}
