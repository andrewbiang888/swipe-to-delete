import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import DelView from './delete';
import State from './model';
import '../css/main.scss';

export default class SwipeToDeleteView extends Marionette.LayoutView {
	className() {
		return 'swipe-to-delete';
	}

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

	initialize({View, DeleteView = DelView, deleteSwipe}) {
		this.state = new State({deleteSwipe});

		if (!this.state.isValid()) {
			throw new Error(_.reduce(this.state.validationError, (memo, error) => `${memo}${error.message} `, ''));
		}

		if (typeof View !== 'function') {
			throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
		}

		if (typeof DeleteView !== 'function') {
			throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
		}

		this.View = View;
		this.DeleteView = DeleteView;

		_.bindAll(this, 'addHandlers', 'interact', 'moveAt', 'stopInteract', 'offInteract', 'endInteract', 'onDelete', 'onCancel');
	}

	onRender() {
		this.showDelete();
		this.showContent();
		this.addHandlers();
	}

	showDelete() {
		var view = new this.DeleteView();
		this.showChildView('delete', view);
	}

	showContent() {
		var view = new this.View(_.omit(this.options, 'el', 'tagName', 'className', 'View', 'DeleteView'));
		this.showChildView('content', view);
	}

	addHandlers() {
		this.startInteract()
				.done(this.interact)
			.then(this.stopInteract)
				.always(this.offInteract)
			.then(this.endInteract)
				.fail(this.addHandlers);
	}

	startInteract() {
		var dfd = new $.Deferred();

		this.onInteract = (e) => {
			this.state.set({startX: e.pageX});
			dfd.resolve();
		};
		this.$('.js-content > *').one('mousedown', this.onInteract);

		return dfd;
	}

	interact() {
		$(document).on('mousemove', this.moveAt);
	}

	moveAt(e) {
		var target = this.getRegion('content').currentView.$el;
		var res = e.pageX - this.state.get('startX');
		target.css({left: res});
	}

	offInteract() {
		$(document).off('mousemove', this.moveAt);
	}

	stopInteract() {
		var dfd = new $.Deferred();

		this.onStopInteract = (e) => this.state.get('startX') === e.pageX ? dfd.reject(e) : dfd.resolve(e);

		this.$('.js-content > *').one('mouseup', this.onStopInteract);
		this.$('.js-content > *').one('mouseleave', this.onStopInteract);

		return dfd;
	}

	endInteract(event) {
		var dfd = new $.Deferred();
		var target = $(event.currentTarget);
		var swipePercent = this.getSwipePercent();

		dfd
			.done(this.onDelete)
			.fail(this.onCancel);

		if (this.state.isDelete(swipePercent)) {
			target.one('transitionend', (e) => dfd.resolve(e));
			swipePercent < 0 ? target.addClass('js-transition-delete-left') : target.addClass('js-transition-delete-right');
		} else {
			target.one('transitionend', (e) => dfd.reject(e));
			target.addClass('js-transition-cancel');
		}

		return dfd;
	}

	getSwipePercent() {
		var shift = this.getRegion('content').currentView.$el.position().left;
		var width = this.getRegion('content').$el.innerWidth();

		return this.state.calcSwipePercent({shift, width});
	}

	onDelete() {
		this.model.destroy({wait: true});
	}

	onCancel(e) {
		var target = $(e.currentTarget);
		target.removeClass('js-transition-cancel');
		target.css({left: 0});

		this.state.set({startX: 0});
	}
}
