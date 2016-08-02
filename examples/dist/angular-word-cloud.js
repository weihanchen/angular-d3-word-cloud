(function() {
    'use strict';
    angular.module('angular-d3-word-cloud', [])
        .directive('wordCloud', [wordCloud])

    function wordCloud() {
        return {
            restrict: 'E',
            scope: {
                words: '=',
                width: '=',
                height: '=',
                onClick: '='
            },
            template: '<div></div>',
            controller: ['$scope','$element', wordsCloudController],
            controllerAs: 'wordsCloudCtrl',
            bindToController: true
        };

        function wordsCloudController($scope, $element) {
        	var self = this;
            var fill = d3.scale.category20();
            /**
             * layout grnerator by d3 and use drawListener to generator word cloud.
             */
            var layout = d3.layout.cloud()
                .padding(5)
                .rotate(function() {
                    return ~~(Math.random() * 2) * 60;
                })
                .font("Impact")
                .fontSize(function(d) {
                    return d.size;
                })
                .on("end", drawListener);
            
            $scope.$watch(watchParameters, watchListener, true);

            function drawListener(words) {
                var wordsCloudSVGDiv = d3.select($element[0]);
                wordsCloudSVGDiv.select('svg').remove();
                wordsCloudSVGDiv.append('svg')
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                    .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .on("click", function(d) {//call back clicked text
                        if (self.onClick) self.onClick(d.text);
                    })
                    .on("mouseover", function() {//zoom in font-size
                        d3.select(this).transition().style("font-size", function(d) {
                            return d.size * 1.2 + 'px';
                        }).attr('opacity', 0.5)
                    })
                    .on("mouseout", function() {
                        d3.select(this).transition().style("font-size", function(d) {
                            return d.size + 'px';
                        }).attr('opacity', 1)
                    })
                    .style("font-size", function(d) {
                        return d.size + "px";
                    })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) {
                        return fill(i);
                    })
                    .attr("text-anchor", "middle")
                    .attr('cursor', 'pointer')
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) {
                        return d.text;
                    })
            }

            function updateLayout(width, height, words) {
                layout.size([width, height])
                    .words(words);
                layout.start();
            }

            /**
             * watch binding scope parameters
             */
            function watchParameters() {
                return self;
            }

            function watchListener(newVal, oldVal) {
                var parameters = angular.copy(newVal);
                if (angular.isUndefined(parameters.words) || angular.isUndefined(parameters.width) || angular.isUndefined(parameters.height)) return;
                updateLayout(parameters.width, parameters.height, parameters.words)
            }
        }
    }
})()
