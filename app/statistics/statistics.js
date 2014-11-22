'use strict';

angular.module('myApp.statistics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/statistics', {
    templateUrl: 'statistics/statistics.html',
    controller: 'StatisticsCtrl'
  });
}])

.controller('StatisticsCtrl', [function() {
    var margins = {
    top: 12,
    left: 80,
    right: 0,
    bottom: 24
},
legendPanel = {
    width: 180
},
width = 800 - margins.left - margins.right,
    height = 100 - margins.top - margins.bottom,
    dataset = [{
        data: [{
            month: 'Performance',
            count: 20
        }],
        name: 'a'
    }, {
        data: [{
            month: 'Performance',
            count: 30
        }],
        name: 'b'
    }, {
        data: [{
            month: 'Performance',
            count: 10
        }],
        name: 'c'
    }, {
        data: [{
            month: 'Performance',
            count: 400
        }],
        name: 'd'
    }
    , {
        data: [{
            month: 'Performance',
            count: 340
        }],
        name: 'd'
    }

    ],
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.count,
                x: o.month
            };
        });
    }),
    stack = d3.layout.stack();

stack(dataset);

var dataset = dataset.map(function (group) {
    return group.map(function (d) {
        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0
        };
    });
}),
    svg = d3.select('#performance')
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),
    xScale = d3.scale.linear()
            .domain([0, 800])
            .range([0, width]),
    months = dataset[0].map(function (d) {
        return d.y;
    }),
    _ = console.log(months),
    yScale = d3.scale.ordinal()
        .domain(months)
        .rangeRoundBands([0, height], .1),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        // .tickValues([])
        // .attr('width', '1')
        // .classed('axis-line', true)
        .orient('left'),
    yAxis2 = d3.svg.axis()
        .scale(yScale)
        .tickSize(0)
        .tickValues("")
        // .attr('width', '1')
        // .classed('axis-line', true)
        .orient('right'),
    colours = d3.scale.category10(),
    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
        return colours(i);
    }),
    rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        .attr('stroke', 'black')
        .attr('stroke-width', '3')
        // .attr('fill', 'white')
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
    })

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
}]);