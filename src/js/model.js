import Backbone from 'backbone';

export default class State extends Backbone.Model {
	defaults() {
		return {
			deletePercent: .5,
			startX: 0
		};
	}

	calcSwipePercent({shift, width}) {
		return shift / width;
	}

	isDelete(percent) {
		return ((percent > 0 && percent >= this.get('deletePercent')) || (percent < 0 && percent <= -this.get('deletePercent')));
	}
}