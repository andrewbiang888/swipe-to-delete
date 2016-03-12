/* Model */
var data = [
	{text: 'Best part of the day ☕', date: '5.03.2016'},
	{text: 'What\'s everybody reading?', date: '3.03.2016'},
	{text: 'End of summer reading list', date: '1.03.2016'}
];

var messages = new Backbone.Collection(data);


/* View */
var MessageView = Backbone.Marionette.ItemView.extend({
	tagName: 'a',
	className: 'list-group-item',
	template: _.template('\
			<h4 class="list-group-item-heading"><%= date %></h4>\
			<p class="list-group-item-text"><%= text %></p>\
			'),
	onSwipeDelete: function () {
		this.model.destroy({wait: true});
	}
	//onSwipeCancel: function () {
	//	console.info('onSwipeCancel');
	//}
});

var MessagesView = Backbone.Marionette.CollectionView.extend({
	childView: SwipeToDeleteView.default,
	childViewOptions: function () {
		return {
			View: MessageView
		};
	}
});

var messagesView = new MessagesView({el: '.js-content', collection: messages});
messagesView.render();

$('.js-repeat').click(function () {
	messages.reset(data);
});