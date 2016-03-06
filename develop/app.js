/* Model */
var Message = Backbone.Model.extend({

});

var Messages = Backbone.Collection.extend({
	model: Message
});

var messages = new Messages([
	{text: 'Best part of the day ☕', date: '5.03.2016'},
	{text: 'What\'s everybody reading?', date: '3.03.2016'},
	{text: 'End of summer reading list', date: '1.03.2016'}
]);


/* View */
var MessageView = Backbone.Marionette.ItemView.extend({
	template: _.template('\
			<h4 class="list-group-item-heading"><%= date %></h4>\
			<p class="list-group-item-text"><%= text %></p>\
			'),
});

var MessagesView = Backbone.Marionette.CollectionView.extend({
	childView: SwipeToDeleteView.default,
	childViewOptions: function () {
		return {
			tagName: 'a',
			className: 'list-group-item',
			View: MessageView
		};
	}
});

var messagesView = new MessagesView({el: '.js-content', collection: messages});
messagesView.render();

