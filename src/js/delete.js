import Marionette from 'backbone.marionette';

export default class DelView extends Marionette.ItemView {
	template() {
		return ``;
	}

	initialize(options) {
		console.info('init DelView', options);

	}
}
