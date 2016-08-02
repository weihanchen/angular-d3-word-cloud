# angular-d3-word-cloud #

## Run with server ##
* bower install
* npm install 
* npm run gulp
* node run.js

## Dependencies ##
* [d3.js](https://d3js.org/)
* [d3.layout.cloud.js](https://www.jasondavies.com/wordcloud/)

## Demo ##
Watch the wordcloud component in action on the [demo page](https://weihanchen.github.io/angular-d3-word-cloud/).

## How to use ##
Add dependencies to the <head> section of your index html:

```html
<meta charset="utf-8">  <!-- it's important for d3.js -->
<script src="js/plugins/jquery.min.js"></script>
<script src="js/plugins/angular.min.js"></script>
<script src="js/plugins/d3.min.js"></script>
<script src="js/plugins/d3.layout.cloud.js"></script>
<script src="js/controllers/app.js"></script>
<script src="dist/angular-word-cloud.js"></script>
```
## Options ##
* `words=[array]` -> [{text: '',size: 0}]
* `height=[number]`
* `width=[number]`
* `on-click=[function]` -> word clicked callback

## Directive Usage ## 
```html
<div id="wordsCloud">
   <word-cloud words="appCtrl.words" width="appCtrl.width" height="appCtrl.height" on-click="appCtrl.wordClicked">
   </word-cloud>
</div>
```

## Base usage ##
Inject `angular-d3-word-cloud` into angular module, set up some options to our controller

```javascript
	(function(){
	angular.module('app',['angular-d3-word-cloud'])
		.controller('appController',['$window','$element',appController])
	function appController($window,$element){
		var self = this;
		self.height = $window.innerHeight * 0.5;
		self.width = $element.find('word-cloud')[0].offsetWidth;
		self.wordClicked = wordClicked;
		self.words = [
			{text: 'Angular',size: 25},
			{text: 'Angular2',size: 35}
		]

		function wordClicked(text){
			alert(text);
		}
	}
})()
```
## Advance usage ##
### Define some content and split(/\s+/g) ###

```javascript
	var content = 'Angular Angular2 Angular3 Express Nodejs';
	originWords = self.content.split(/\s+/g);
    originWords = originWords.map(function(word) {
        return {
            text: word,
            count: Math.floor(Math.random() * maxWordCount)
        }
     }).sort(function(a, b) {
          return b.count - a.count;
     })
```

### Compute word size ###

```javascript
	 var element = $element.find('#wordsCloud');
     var height = $window.innerHeight * 0.75;
     element.height(height);
     var width = element[0].offsetWidth;
     var maxCount = originWords[0].count;
     var minCount = originWords[originWords.length - 1].count;
     var maxWordSize = width * 0.15;
     var minWordSize = maxWordSize / 5;
     var spread = maxCount - minCount;
     if (spread <= 0) spread = 1;
     var step = (maxWordSize - minWordSize) / spread;
     self.words = originWords.map(function(word) {
         return {
             text: word.text,
             size: Math.round(maxWordSize - ((maxCount - word.count) * step))
         }
     })
     self.width = width;
     self.height = height;
```