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

		_.bindAll(this, 'addHandlers', 'offStartInteract', 'interact', 'moveAt', 'stopInteract', 'offStopInteract', 'offInteract', 'endInteract', 'onDelete', 'onCancel', 'offTransitionend');

		this.state = new Backbone.Model({startX: 0});
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

		this.startInteract()
				.done(this.offStartInteract)
				.done(this.interact)
			.then(this.stopInteract)
				.always(this.offStopInteract)
				.always(this.offInteract)
			.then(this.endInteract)
				.fail(this.addHandlers);
	}

	startInteract() {
		console.info('startInteract');

		var dfd = new $.Deferred();

		this.onInteract = (e) => {
			console.info('startInteract resolve');
			this.state.set({startX: e.pageX});
			dfd.resolve();
		};
		this.$('.js-content > *').on('mousedown', this.onInteract);

		return dfd;
	}

	offStartInteract() {
		console.info('offStartInteract');

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

	offInteract() {
		console.info('offInteract');

		$(document).off('mousemove', this.moveAt);
	}

	stopInteract() {
		console.info('stopInteract');

		var dfd = new $.Deferred();

		this.onStopInteract = (e) => {
			console.info('stopInteract resolve');

			if (this.state.get('startX') === e.pageX) {
				dfd.reject(e);
			}

			dfd.resolve(e);
		};

		this.$('.js-content > *').on('mouseup', this.onStopInteract);
		this.$('.js-content > *').on('mouseleave', this.onStopInteract);

		return dfd;
	}

	offStopInteract() {
		console.info('offStopInteract');

		this.$('.js-content > *').off('mouseup', this.onStopInteract);
		this.$('.js-content > *').off('mouseleave', this.onStopInteract);
	}

	endInteract(event) {
		console.info('endInteract');

		var dfd = new $.Deferred();
		var target = $(event.currentTarget);
		var swipePercent = this.getSwipePercent();

		dfd
			.done(this.onDelete)
			.fail(this.onCancel)
			.always(this.offTransitionend);

		if (this.isDelete(swipePercent)) {
			this.onTransitionend = (e) => {
				dfd.resolve(e);
			};
			target.on('transitionend', this.onTransitionend);

			swipePercent < 0 ? target.addClass('js-transition-delete-left') : target.addClass('js-transition-delete-right');
		} else {
			this.onTransitionend = (e) => {
				console.info('onTransitionend');
				dfd.reject(e);
			};
			target.on('transitionend', this.onTransitionend);

			target.addClass('js-transition-cancel');
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
