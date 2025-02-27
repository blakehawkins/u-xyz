'use strict';

angular.module('myApp.statistics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/statistics', {
    templateUrl: 'statistics/statistics.html',
    controller: 'StatisticsCtrl'
  });
}])

.controller('StatisticsCtrl', function($scope, $http) {
    // request the hardcoded stats data
    $http.get('http://54.77.53.126:27080/test/data/_find')
            .success(function(data){
                $scope.dataset = data.results;
                var qq = $scope.dataset;
                draw_graph();
                $scope.dataset[0].count = 500;
                draw_graph();
            });

    var draw_graph = function() {
        var margins = {
            top: 12,
            left: 80,
            right: 0,
            bottom: 24
        };

        var width = 800 - margins.left - margins.right;

        var height = 100 - margins.top - margins.bottom;

        var d = $scope.dataset.map(function(o, i){
            return [{y: o.count, x: o.category, y0: 0}];
        });

        var stack = d3.layout.stack();

        stack(d);

        d = d.map(function (group) {
            return group.map(function (d) {
                // Invert the x and y values, and y0 becomes x0
                return {
                    x: d.y,
                    y: d.x,
                    x0: d.y0
                };
            });
        });

        var svg = d3.select('#performance')
            .append('svg')
            .attr('width', width + margins.left + margins.right)
            .attr('height', height + margins.top + margins.bottom)
            .append('g')
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

        var xMax = d3.max(d, function (group) {
            return d3.max(group, function (d) {
                return d.x + d.x0;
            });
        });

        var xScale = d3.scale.linear()
                .domain([0, 800])
                .range([0, width]);

        var categorys = d[0].map(function (d) {
            return d.y;
        });


        var yScale = d3.scale.ordinal()
            .domain(categorys)
            .rangeRoundBands([0, height], .1);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .tickSize(0)
            .orient('left');

        var yAxis2 = d3.svg.axis()
            .scale(yScale)
            .tickSize(0)
            .tickValues("")
            .orient('right');

        // var colours = d3.scale.category10();
        
        var colours = function(i) {

        	var count = svg.selectAll('g')[0].length;
        	var half = Math.round(count/2);

        	var arr = ["#18D2E7", "#15B8CA","#13A8B9","#10919E","#0E7985","#0B5C66","#073D43","#053136","#032225", "#000000"];

        	return ( Math.abs(half - i) > arr.length ) ? "#000000" : arr[Math.abs(half - i)];
        }

        var groups = svg.selectAll('g')
            .data(d)
            .enter()
            .append('g')
            .style('fill', function (d, i) {
            	return colours(i);
        	});

        var rects = groups.selectAll('rect')
            .data(function (d) {
                return d;
            })
            .enter()
            .append('rect')
            .attr('stroke', 'black')
            .attr('stroke-width', '3')
            .attr('x', function (d) {
                return xScale(d.x0);
            })
            .attr('y', function (d, i) {
                return yScale(d.y);
            })
            .attr('height', function (d) {
                return yScale.rangeBand();
            })
            .attr('width', function (d) {
                return xScale(d.x);
            })
            .on('mouseover', function (d) {
                var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
                var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

                d3.select('#tooltip')
                    .style('left', xPos + 'px')
                    .style('top', yPos + 'px')
                    .select('#value')
                    .text(d.x);

                d3.select('#tooltip').classed('hidden', false);
            })
            .on('mouseout', function () {
                d3.select('#tooltip').classed('hidden', true);
            });

        svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')');

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(-3, 0)')
            .call(yAxis);

        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(724, 0)')
            .call(yAxis2);
    }
});