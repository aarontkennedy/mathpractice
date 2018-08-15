import /*React,*/ { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import "./BarChart.css";

//https://vijayt.com/post/plotting-bar-chart-d3-react/

class BarChart extends Component {

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    plot(chart, width, height, data) {
        // create scales!
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.type))
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => xScale(d.type))
            .attr('y', d => yScale(d.progress))
            .attr('height', d => (height - yScale(d.progress)))
            .attr('width', d => xScale.bandwidth())
            .style('fill', (d, i) => colorScale(i));

        chart.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => xScale(d.type) + xScale.bandwidth() / 2)
            .attr('dx', 0)
            .attr('y', d => yScale(d.progress))
            .attr('dy', -6)
            .text(d => d.progress+"%")

        const xAxis = d3.axisBottom()
            .scale(xScale);

        chart.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

        chart.append('g')
            .classed('y axis', true)
            .attr('transform', 'translate(0,0)')
            .call(yAxis);

        chart.select('.y.axis')
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('transform', `translate(-50, ${height / 2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '1rem')
            .style('text-anchor', 'middle')
            .text('Percent Progress');

        const yGridlines = d3.axisLeft()
            .scale(yScale)
            .ticks(5)
            .tickSize(-width, 0, 0)
            .tickFormat('')

        chart.append('g')
            .call(yGridlines)
            .classed('gridline', true);
    }

    drawChart(title, data) {
        const width = 800;
        const height = 450;

        const viewBox = `0 0 ${width} ${height}`;

        // create a div with an id of chart
        const el = new Element('div');
        const svg = d3.select(el)
            .attr('id', 'chartContainer')
            .append('svg')
            .attr('id', 'chart')
            .attr('viewBox', viewBox);
            /*
            .attr('width', width)
            .attr('height', height);*/

        const margin = {
            top: 60,
            bottom: 60,
            left: 80,
            right: 40
        };

        const chart = svg.append('g')
            .classed('display', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        /*const titleEl =*/ svg.append('g')
            .append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .attr('fill', '#000')
            .style('font-size', '1rem')
            .style('text-anchor', 'middle')
            .text(title);

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom
        this.plot(chart, chartWidth, chartHeight, data);

        return el.toReact();
    }

    render() {

        return this.drawChart(this.props.title, this.props.data);
    }
}

export default BarChart;