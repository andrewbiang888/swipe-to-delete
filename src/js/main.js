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
		//console.info('events', this.options);

		return {
			'mousedown .js-content > *': 'onStart',
			'mouseup .js-content > *': 'onEnd'
		};
	}

	initialize({View, DeleteView = DelView}) {
		//console.info('init', this.options);

		if (typeof View !== 'function') {
			throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
		}

		if (typeof DeleteView !== 'function') {
			throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
		}

		this.View = View;
		this.DeleteView = DeleteView;

		this.onEnd.bind(this);

		_.bindAll(this, 'onMove', 'onEnd');
	}

	onRender() {
		this.$el.addClass('swipe-to-delete');
		this.showDelete();
		this.showContent();
	}

	showDelete() {
		var view = new this.DeleteView();
		this.showChildView('delete', view);
	}

	showContent() {
		var view = new this.View(_.omit(this.options, 'el', 'tagName', 'className', 'View', 'DeleteView'));
		this.showChildView('content', view);
	}

	onStart(e) {
		var target = e.currentTarget;
		//console.info('onStart', target);
		document.addEventListener('mousemove', this.onMove, false);
		target.addEventListener('mouseleave', this.onEnd, false);

		this.startX = e.pageX;
	}

	onMove(e) {
		//console.info('onMove', e, e.currentTarget);
		this.moveAt(e);
	}

	onEnd(e) {
		var target = e.currentTarget;
		//console.info('onEnd', this);
		document.removeEventListener('mousemove', this.onMove, false);
		target.removeEventListener('mouseleave', this.onEnd, false);
	}

	moveAt(e) {
		var target = this.getRegion('content').currentView.$el;
		var res = e.pageX - this.startX;
		target.css({left: res});
	}
}
