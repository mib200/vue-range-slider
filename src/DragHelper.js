// @flow

import DocumentEventHelper from './DocumentEventHelper'
import {
	relativeMouseOffset
} from './utils'

export default {
	mixins: [DocumentEventHelper],

	props: {
		targetSelector: String,
		disabled: Boolean
	},

	data: function data() {
		return {
			isDrag: false
		};
	},

	watch: {
		target: 'bindTarget'
	},

	mounted: function mounted() {
		this.bindTarget();
	},

	events: {
		mousedown: function mousedown(event) {
			return this.dragStart(event, this.offsetByMouse);
		},
		mousemove: function mousemove(event) {
			return this.dragMove(event, this.offsetByMouse);
		},
		mouseup: function mouseup(event) {
			return this.dragEnd(event, this.offsetByMouse);
		},
		touchstart: function touchstart(event) {
			return this.dragStart(event, this.offsetByTouch);
		},
		touchmove: function touchmove(event) {
			return this.dragMove(event, this.offsetByTouch);
		},
		touchend: function touchend(event) {
			return this.dragEnd(event, this.offsetByTouch);
		},
		touchcancel: function touchcancel(event) {
			return this.dragEnd(event, this.offsetByTouch);
		}
	},

	methods: {
		bindTarget: function bindTarget() {
			this.target = this.$el.querySelector(this.targetSelector) || this.$el;
		},
		offsetByMouse: function offsetByMouse(event) {
			return (0, relativeMouseOffset)(event, this.$el);
		},
		offsetByTouch: function offsetByTouch(event) {
			var touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0];
			return (0, relativeMouseOffset)(touch, this.$el);
		},
		dragStart: function dragStart(event, f) {
			if (this.disabled || this.target !== event.target) return;
			event.preventDefault();
			this.isDrag = true;
			this.$emit('dragstart', event, f(event), this.target);
		},
		dragMove: function dragMove(event, f) {
			if (!this.isDrag) return;
			event.preventDefault();
			this.$emit('drag', event, f(event), this.target);
		},
		dragEnd: function dragEnd(event, f) {
			if (!this.isDrag) return;
			event.preventDefault();
			this.isDrag = false;
			this.$emit('dragend', event, f(event), this.target);
		}
	},

	render: function render() {
		return this.$slots.default && this.$slots.default[0];
	}
}