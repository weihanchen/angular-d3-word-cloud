'use strict';
describe('angular-d3-word-cloud directive', function() {
   var $compile, $rootScope, $timeout, element;
   beforeEach(module('angular-d3-word-cloud'));
   //Inject dependencies
   beforeEach(inject(function(_$compile_, _$rootScope_, _$document_, _$timeout_, _$window_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
   }));

   function dispatchEventToWord(index, eventType) {
      var words = d3.select(element[0]).select('svg').selectAll('text');
      var word = words.nodes()[index];
      return d3.select(word).dispatch(eventType);
   }

   function flushAllD3Transitions() {
      var now = Date.now;
      Date.now = function() {
         return Infinity;
      };
      d3.timerFlush();
      Date.now = now;
   }

   function getElements() {
      return element.find('text');
   }

   function getWordStyle(index, style) {
      var words = d3.select(element[0]).select('svg').selectAll('text');
      var word = words.nodes()[index];
      return $(word).css(style);
   }


   describe('basic feature', function() {
      beforeEach(function() {
         $rootScope.words = [{
               text: 'Angular',
               size: 35
            },
            {
               text: 'Angular2',
               size: 25
            }
         ]
         $rootScope.selectedWord;
         $rootScope.height = 500;
         $rootScope.width = 500;
         $rootScope.wordClicked = function(word) {
            $rootScope.selectedWord = word;
         }
         element = $compile("<word-cloud words='words' width='width' height='height' on-click='wordClicked'></word-cloud>")($rootScope);
         spyOn($rootScope, 'wordClicked').and.callThrough();
         $rootScope.$digest();
      })
      it('dose not rendered the elements when not pass width、height paramters', function() {
         //Act
         element = $compile("<word-cloud on-click='wordClicked'></word-cloud>")($rootScope);
         $rootScope.$digest();
        var wordElements = getElements();
         //Assert
         expect(wordElements.length).toBe(0);
      })

      it('should add the elements to the dom', function() {
         //Act
         var wordElements = getElements();
         //Assert
         expect(wordElements.length).toBe($rootScope.words.length);
      });

      it('should add another word to the list', function() {
         //Act
         $rootScope.words.push({
            text: 'Angular3',
            size: 15
         });
         $rootScope.$apply();
         //Assert
         var wordElements = getElements();

         expect(wordElements.length).toBe($rootScope.words.length);
      });

      it('should remove last word from the list', function() {
         //Act
         $rootScope.words.splice($rootScope.words.length - 1, 1);
         $rootScope.$apply();
         var wordElements = getElements();
         //Assert
         expect(wordElements.length).toBe($rootScope.words.length);
      });

      it('should click the word', function() {
         //Act
         dispatchEventToWord(0, 'click');
         $rootScope.$apply();
         //Assert
         expect($rootScope.wordClicked).toHaveBeenCalled();
      });

      it('dose not call wordClicked if not binding onClick', function() {
         //Arrange
         element = $compile("<word-cloud words='words' width='width' height='height'></word-cloud>")($rootScope);
         $rootScope.$digest();
         //Act
         dispatchEventToWord(0, 'click');
         $rootScope.$apply();
         //Assert
         expect($rootScope.wordClicked).not.toHaveBeenCalled();
      })

      it('shoud word size greater then origin size when mouseover', function() {
         //Arrange
         var sourceWordSize = $rootScope.words[0].size;

         //Act
         dispatchEventToWord(0, 'mouseover');
         flushAllD3Transitions();
         var currentFontSize = getWordStyle(0, 'font-size');
         currentFontSize = parseInt(currentFontSize.replace('px', ''));

         //Assert
         expect(currentFontSize).toBeGreaterThan(sourceWordSize);
      })

      it('should word size equal with origin size when zoom in and out', function() {
         //Arrange
         var sourceWordSize = $rootScope.words[0].size;

         //Act
         dispatchEventToWord(0, 'mouseover');
         flushAllD3Transitions();
         dispatchEventToWord(0, 'mouseout');
         flushAllD3Transitions();
         var currentFontSize = getWordStyle(0, 'font-size');
         currentFontSize = parseInt(currentFontSize.replace('px', ''));

         //Assert
         expect(sourceWordSize).toEqual(currentFontSize);
      })
   })
})
