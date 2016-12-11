(function() {
    angular.module('app', ['angular-d3-word-cloud'])
        .controller('appController', ['$window', '$element', '$timeout', appController])

    function appController($window, $element, $timeout) {
        var originWords = [];
        var maxWordCount = 1000;
        var self = this;
        self.content = 'If you prefer to not use the automatic generator, push a branch named gh-pages to your repository to create a page manually. In addition to supporting regular HTML content, GitHub Pages support Jekyll, a simple, blog aware static site generator GitHub username to generate a link to their profile';
        self.generateWords = generateWords;
        self.wordClicked = wordClicked;
        self.words = [];
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
                }
            }).sort(function(a, b) {
                return b.count - a.count;
            })
            resizeWordsCloud();
        }
        /**
         * adjust words size base on width
         */
        function resizeWordsCloud() {
            $timeout(function() {
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
            })
        }

        function wordClicked(word) {
            alert('text: ' + word.text + ',size: ' + word.size);
        }
    }
})()