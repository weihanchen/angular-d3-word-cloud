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

   function getElements() {
      return element.find('text');
   }

   function dispatchEventToWord(index, eventType) {
      var words = d3.select(element[0]).select('svg').selectAll('text');
      return words.each(function(d, i) {
         if (i === index) {
            var self = this;
            d3.select(self).dispatch(eventType);
         }
      })
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
         //Act
         dispatchEventToWord(0, 'click');
         $rootScope.$apply();
         //Assert
         expect($rootScope.wordClicked).not.toHaveBeenCalled();
      })

      // it('shoud zoom in word size when mouseover', function() {
      //    //Act
      //    dispatchEventToWord(0, 'mouseover');
      //    $rootScope.$apply();
      //    //Assert
      //    var t = d3.select(element[0]).select('svg').select('text');
      // })
   })
})
