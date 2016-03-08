import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
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

		_.bindAll(this, 'onEnd', 'onDelete', 'onCancel', 'interact', 'moveAt', 'addStopInteract', 'offInteract', 'offMove', 'offStopInteract', 'addHandlers');

		this.state = new Backbone.Model({
			startX: 0
		});
	}

	onRender() {
		this.$el.addClass('swipe-to-delete');
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
		console.info('addHandlers');

		this.addInteract()
				.done(this.offInteract)
				.done(this.interact)
			.then(this.addStopInteract)
				.done(this.offStopInteract)
				.done(this.offMove)
			.then(this.onEnd)
				.done(this.onDelete)
				.fail(this.onCancel)
				.fail(this.addHandlers)
				.always(this.offTransitionend);
	}

	addInteract() {
		//console.info('addInteract');

		var dfd = new $.Deferred();

		this.onInteract = (e) => {
			console.info('addInteract resolve');
			this.state.set({startX: e.pageX});
			dfd.resolve();
		};
		this.$('.js-content > *').on('mousedown', this.onInteract);

		return dfd;
	}

	offInteract() {
		//console.info('offInteract');
		this.$('.js-content > *').off('mousedown', this.onInteract);
	}

	interact() {
		console.info('interact');
		$(document).on('mousemove', this.moveAt);
	}

	moveAt(e) {
		var target = this.getRegion('content').currentView.$el;
		var res = e.pageX - this.state.get('startX');
		target.css({left: res});
	}

	offMove() {
		//console.info('offMove');
		$(document).off('mousemove', this.moveAt);
	}

	addStopInteract() {
		//console.info('addStopInteract');

		var dfd = new $.Deferred();

		this.onStopInteract = (e) => {
			console.info('addStopInteract resolve');
			dfd.resolve(e);
		};

		this.$('.js-content > *').on('mouseup', this.onStopInteract);
		this.$('.js-content > *').on('mouseleave', this.onStopInteract);

		return dfd;
	}

	offStopInteract() {
		//console.info('offStopInteract');

		this.$('.js-content > *').off('mouseup', this.onStopInteract);
		this.$('.js-content > *').off('mouseleave', this.onStopInteract);
	}

	onEnd(event) {
		console.info('onEnd');
		var dfd = new $.Deferred();
		var target = $(event.currentTarget);
		var swipePercent = this.getSwipePercent();

		if (this.isDelete(swipePercent)) {
			swipePercent < 0 ? target.addClass('js-transition-delete-left') : target.addClass('js-transition-delete-right');
			this.onTransitionend = (e) => {
				dfd.resolve(e);
			};
			target.on('transitionend', this.onTransitionend);
		} else {
			target.addClass('js-transition-cancel');
			this.onTransitionend = (e) => {
				dfd.reject(e);
			};
			target.on('transitionend', this.onTransitionend);
		}

		return dfd;
	}

	isDelete(percent) {
		return ((percent > 0 && percent >= .5) || (percent < 0 && percent <= -.5));
	}

	getSwipePercent() {
		var shift = this.getRegion('content').currentView.$el.position().left;
		var width = this.getRegion('content').$el.innerWidth();

		return shift / width;
	}

	onDelete() {
		console.info('onDelete');
		this.model.destroy({wait: true});
	}

	onCancel(e) {
		console.info('onCancel');

		var target = $(e.currentTarget);
		target.removeClass('js-transition-cancel');
		target.css({left: 0});

		this.state.set({startX: 0});
	}

	offTransitionend(e) {
		var target = $(e.currentTarget);
		target.off('transitionend', this.onTransitionend);
	}
}
