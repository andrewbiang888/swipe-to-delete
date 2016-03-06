import _ from 'underscore';
import Marionette from 'backbone.marionette';
import DelView from './delete';

export default class SwipeToDeleteView extends Marionette.LayoutView {
	template() {
		return `
			<div class="js-delete"></div>
			<div class="js-content"></div>
		`;
	}

	regions() {
		return {
			delete: '.js-delete',
			content: '.js-content'
		};
	}

	events() {
		return {
			'mousedown': 'onStart',
			'mouseup': 'onEnd'
		};
	}

	initialize({View, DeleteView = DelView}) {
		console.info('init', this.options);

		if (typeof View !== 'function') {
			throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
		}

		if (typeof DeleteView !== 'function') {
			throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
		}
	}

	onRender() {
		this.showContent();
	}

	showContent() {
		var view = new this.options.View(_.omit(this.options, 'el', 'tagName', 'className', 'View', 'DeleteView'));
		this.showChildView('content', view);
	}

	onStart(e) {
		console.info('onStart', e);
		document.addEventListener('mousemove', this.onMove, false);

	}

	onMove(e) {
		console.info('onMove', e);

	}

	onEnd(e) {
		console.info('onEnd', e);
		document.removeEventListener('mousemove', this.onMove, false);
	}
}
