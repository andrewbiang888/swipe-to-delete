# Swipe-to-delete Marionette View
Implement the "swipe to delete" UI-pattern in the Marionette framework.

## Example
You may see an example [here](http://gaer87.github.io/swipe-to-delete/example/).

## Usage
This is a plugin built on top of the base Marionette LayoutView. It contains two regions: "content" and "delete". A content region show your a view. A delete region show a decoration view under the content view. It's showed when content view is swiped.

Usually, the swipe-to-delete view is used in the Marionette CollectionView.

```
var collectionView = Backbone.Marionette.CollectionView.extend({
	childView: SwipeToDeleteView.default,
	childViewOptions: function () {
		return {
			View: MessageView
		};
	}
});
```

- *childView* contains the swipe-to-delete Marionette view.
- *childViewOptions* returns its options.

### Include lib
It's available on *SwipeToDeleteView.default*.
#### CommonJS
```
var SwipeToDeleteView = require('swipe-to-delete');
// SwipeToDeleteView.default
```
#### AMD
```
define(['swipe-to-delete'], function(SwipeToDeleteView) {
	// SwipeToDeleteView.default
});
```
#### Global
```
<script src="node_modules/swipe-to-delete/dist/swipe-to-delete.min.js"></script>
<script>
// SwipeToDeleteView.default
</script>
```

### Options
- *View* - This must be your a view object definition, not an instance. It can be any Backbone.View or be derived from Marionette.ItemView. _Required_.
- *DeleteView* - This is a decoration view object definition under a content view. By default, showed red element with trash icons. _Optional_.
- *deleteSwipe* - This is a number. If a content view is swiped more this the number than a swipe-to-delete view will start a delete animation. By default, it's equal "0.5". _Optional_.

### Events
The swipe-to-delete view triggers following events on a content view:
- *swipe:delete* - when a delete animation is ended. It's used to destroy entity.
```
onSwipeDelete: function () {
	this.model.destroy();
}
```
- *swipe:cancel* - when a cancel animation is ended.

### Styles
You may set up styles in "swipe-to-delete.css" under the comment "Custom styles". Class _js-content_ is content region, _js-delete_ is delete region. Classes _js-transition-delete-right_ and _js-transition-delete-left_ are added on a content view when it's swiped more than "deleteSwipe" options. Class _js-transition-cancel_ is added when a content view swiped less than "deleteSwipe" options. Animations are made by CSS3 transition.

## Downloads
Swipe-to-delete is available via [bower](http://bower.io) and [npm](https://www.npmjs.com/). Else you can download the latest builds directly from the "dist" folder above.

## Contributing
From opening a bug report to creating a pull request: every contribution is appreciated and welcome. If you're planing to implement a new feature or change the api please create an issue first.

## License
[MIT](http://www.opensource.org/licenses/mit-license.php)