describe('word cloud directive testing...', function() {
    var $compile;
    var $rootScope;
    var element;
    beforeEach(module('angular-d3-word-cloud'));
    //Inject dependencies
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    describe('with an array object', function() {
        describe('using integer sizes', function() {
            beforeEach(function() {
                $rootScope.words = [
                    { text: 'Angular', size: 25 },
                    { text: 'Angular2', size: 35 }
                ]
                $rootScope.selectedWord;
                $rootScope.height = 500;
                $rootScope.width = 500;
                $rootScope.wordClicked = function(word) {
                	$rootScope.selectedWord = word;
                }
                element = $compile("<word-cloud words='words' width='width' height='height' on-click='wordClicked'></word-cloud>")($rootScope);
                $rootScope.$digest();
            })
            it('should add the elements to the dom', function() {
                var wordElements = element.find('text');
                expect(wordElements.length).toBe($rootScope.words.length);
            })
            it('should add another word to the list', function() {
                $rootScope.$apply(function() { $rootScope.words.push({ text: 'Angular3', size: 45 }); });
                var wordElements = element.find('text');
                expect(wordElements.length).toBe($rootScope.words.length);
            });
            it('should remove last word from the list', function() {
				$rootScope.$apply(function() { $rootScope.words.splice($rootScope.words.length - 1,1); });
				var wordElements = element.find('text');
                expect(wordElements.length).toBe($rootScope.words.length);
			});
			// it('should send the word with the click', function() {
			// 	console.log(element.find('text')[0])
			// 	element.find('text')[0].click();
			// 	expect($rootScope.selectedWord).toHaveBeenCalledWith('Angular');
			// });
        })
    })
})
