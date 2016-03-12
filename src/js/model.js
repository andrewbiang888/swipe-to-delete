import Backbone from 'backbone';

export default class State extends Backbone.Model {
	defaults() {
		return {
			deleteSwipe: .5,
			startX: 0
		};
	}

	initialize({deleteSwipe}) {
		typeof deleteSwipe !== 'undefined' && this.set({deleteSwipe});
	}

	validate(attrs) {
		var errors = [];

		if (!attrs.deleteSwipe) {
			return;
		}

		if (typeof attrs.deleteSwipe !== 'number') {
			errors.push({message: '"deleteWidth" can be number only.'});
			return errors;
		}

		if (attrs.deleteSwipe < 0 || attrs.deleteSwipe > 1) {
			errors.push({message: '"deleteWidth" can be in range [0, 1].'});
			return errors;
		}
	}

	calcSwipePercent({shift, width}) {
		return shift / width;
	}

	isDelete(percent) {
		return ((percent > 0 && percent >= this.get('deleteSwipe')) || (percent < 0 && percent <= -this.get('deleteSwipe')));
	}
}