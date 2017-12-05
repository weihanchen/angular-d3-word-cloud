(function() {
   angular.module('app', ['angular-d3-word-cloud', 'colorpicker.module'])
      .controller('AppController', ['$window', '$timeout', appController]);

   function appController($window, $timeout) {
      var originWords = [];
      var maxWordCount = 1000;
      var self = this;
      self.content = 'If you prefer to not use the automatic generator, push a branch named gh-pages to your repository to create a page manually. In addition to supporting regular HTML content, GitHub Pages support Jekyll, a simple, blog aware static site generator GitHub username to generate a link to their profile';
      self.customColor;
      self.generateWords = generateWords;
      self.padding = 8;
      self.editPadding = 8;
      self.useTooltip = true;
      self.useTransition = true;
      self.wordClicked = wordClicked;
      self.words = [];
      self.random = random;
      generateWords();
      angular.element($window).bind('resize', resizeWordsCloud);
      /**
       * generate words base on some content by split(/\s+/g) and sort descending
       */
      function generateWords() {
         originWords = self.content.split(/\s+/g);
         originWords = originWords.map(function(word) {
            return {
               text: word,
               count: Math.floor(Math.random() * maxWordCount)
            };
         }).sort(function(a, b) {
            return b.count - a.count;
         });
         resizeWordsCloud();
      }
      /**
       * adjust words size base on width
       */
      function resizeWordsCloud() {
         $timeout(function() {
            var element = document.getElementById('wordsCloud');
            var height = $window.innerHeight * 0.75;
            element.style.height = height + 'px';
            var width = element.getBoundingClientRect().width;
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
                  size: Math.round(maxWordSize - ((maxCount - word.count) * step)),
                  color: self.customColor,
                  tooltipText: word.text + ' tooltip'
               };
            });
            self.width = width;
            self.height = height;
            self.padding = self.editPadding;
            self.rotate = self.editRotate;
         });
      }

      function random() {
         return 0.4; // a constant value here will ensure the word position is fixed upon each page refresh.
      }

      function wordClicked(word) {
         alert('text: ' + word.text + ',size: ' + word.size);
      }
   }
})();
