'use strict';

import Marionette from 'backbone.marionette';
import SwipeToDeleteView from '../src/js/main';
import State from '../src/js/model';
import DelView from '../src/js/delete';

describe('The MainView', function () {
	class View extends Marionette.ItemView {
		template() {
			return '<p>Test</p>';
		}
	}

	let swipeToDeleteView;

	//beforeEach(function () {
	//	swipeToDeleteView = new SwipeToDeleteView({View});
	//});

	it('do an instance', function () {
		swipeToDeleteView = new SwipeToDeleteView({View});
		expect(typeof swipeToDeleteView).toBe('object');
	});

	it('has the "swipe-to-delete" class', function () {
		swipeToDeleteView = new SwipeToDeleteView({View});
		expect(swipeToDeleteView.$el.hasClass('swipe-to-delete')).toBe(true);
	});

	it('has "js-delete" and "js-content" elements', function () {
		swipeToDeleteView = new SwipeToDeleteView({View});
		swipeToDeleteView.render();

		expect(swipeToDeleteView.$('.js-delete').length).toBe(1);
		expect(swipeToDeleteView.$('.js-content').length).toBe(1);
	});

	describe('initializing', function () {
		it('accept options', function () {
			expect(() => { new SwipeToDeleteView() }).toThrowError('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
			expect(() => { new SwipeToDeleteView({View: 'dummy'}) }).toThrowError('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
			expect(() => { new SwipeToDeleteView({View: View, DeleteView: 'dummy'}) }).toThrowError('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
		});

		it('validate the "deleteSwipe" option', function () {
			spyOn(State.prototype, 'validate');
			new SwipeToDeleteView({View: View});
			expect(State.prototype.validate).toHaveBeenCalled();
		});
	});

	it('render child views', function () {
		spyOn(DelView.prototype, 'render');
		spyOn(View.prototype, 'render');

		swipeToDeleteView = new SwipeToDeleteView({View});
		swipeToDeleteView.render();

		expect(View.prototype.render).toHaveBeenCalled();
		expect(DelView.prototype.render).toHaveBeenCalled();
	});

	it('start interacting', function () {
		spyOn(SwipeToDeleteView.prototype, 'interact');

		swipeToDeleteView = new SwipeToDeleteView({View, el: document.body});
		swipeToDeleteView.render();

		let event = new Event('mousedown');
		event.pageX = 100;
		let el = swipeToDeleteView.$('.js-content > *').get(0);
		el.dispatchEvent(event);

		expect(SwipeToDeleteView.prototype.interact).toHaveBeenCalled();
	});
	
	it('', function () {
		
	});
});