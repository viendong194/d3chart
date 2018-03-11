import React, { Component } from 'react';
import * as d3 from 'd3';


class App extends Component {
  constructor(){
    super();
    this.data01 = [
      {year:13,line:2.2,bar:835115},
      {year:14,line:2.9,bar:855197},
      {year:15,line:4.5,bar:928628},
      {year:16,line:2.2,bar:974127},
      {year:17,line:0.8,bar:975974}
    ]
  }
  componentDidMount(){
    this.createGraph('type_01');
  }
  createGraph = (type) => {
    switch(type){
      case 'type_01' : this.graph01(type);
      break;
      case 'type_02' : this.graph02(); 
      break;
      default : return;
    }
  }
  // create graph
  graph01 = (type) =>{
    let data = this.data01;
    var container = document.getElementById(type);
    container.style.width = "960px";
    container.style.height = "500px";
    
    console.log("it's worked");
    let mW = 668;
    let mH = 263;
    // let margin = {top: mH/25, right: mW/30, bottom: mH/25, left: mW/30},
    let margin = {top: 30, right: 30, bottom: 30, left: 80},
    width = mW - margin.left - margin.right,
    height = mH - margin.top - margin.bottom;
  

    // set the ranges
    let xBar = d3.scaleBand().range([0, width]).paddingInner(0.75).paddingOuter(0.35);
    let xLine = d3.scalePoint().range([0, width]).padding(0.5);
    let yBar = d3.scaleLinear().range([height, 0]);
    let yLine = d3.scaleLinear().range([height, 0]);
    // define line
    let valueline = d3.line()
    .x(function(d) { return xLine(d.year); })
    .y(function(d) { return yLine(d.line); });

    let svg = d3.select("#type_01").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    xBar.domain(data.map(function(d) { return d.year; }));
    xLine.domain(data.map(function(d) { return d.year; }));
    yBar.domain([0, 1000000]);
    yLine.domain([0, 5]);
    
    let rect = svg.selectAll("rect")
    .data(data);
    rect.enter().append("rect")
  	.merge(rect)
      .attr("class", "bar")
      .style("stroke", "none")
      .style("fill", "#9765a0")
      .attr("x", function(d){ return xBar(d.year); })
      .attr("width", function(d){ return xBar.bandwidth(); })
      .attr("y", function(d){ return yBar(d.bar); })
      .attr("transform", function(d){ 
        let cx = xBar(d.year) + xBar.bandwidth()/2;
        let cy = yBar(d.bar) + (height-yBar(d.bar))/2;
        return " rotate(180,"+cx+","+cy+")"})
      .attr("height", 0 )
      .transition().duration(1500).attr("height",function(d){return height - yBar(d.bar);});

      let line = svg.append("path")
          .data([data])
          .attr("class", "line")
          .style("stroke", "#f2bc98")
          .attr("d", valueline)
          .attr("fill","none");
      let totalLength = line.node().getTotalLength();
      
          line
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
              .duration(2000)
              // .ease("linear")
              .attr("stroke-dashoffset", 0);

      let points = svg.selectAll("rect.point1")
      .data(data);
      svg.append("line")
      .attr("x1",0).attr("y1",height+1)
      .attr("x2",width).attr("y2",height+1)
      .style("stroke", "#000");
  		
      points.enter().append("rect")
          .attr("class", "none")
          .attr("stroke", "#f2bc98")
          .attr("fill","#f2bc98")
          .style("opacity","0")
          .attr("x", function(d){ return xLine(d.year); })
          .attr("y", function(d){ return yLine(d.line); })
          .attr("width", function(d){ return 5; })
          .attr("height", function(d){ return 5; })
          .attr("transform", function(d){ 
            let cx = xLine(d.year) + 2.5;
            let cy = yLine(d.line) + 2.5;
            return "translate(-2.5 -2.5) rotate(45,"+cx+","+cy+")"})
            .transition()
            .delay(function(d,i){
              return i*500
            })
            .duration(1000)
            .style("opacity","1");
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xLine))
        .select(".domain").remove();  
    let axis02 = d3.axisLeft(yBar).ticks(5);
        svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(axis02)
        .select(".domain").remove();
  
    // Add the Y1 Axis
    let axis01 = d3.axisRight(yLine)
    .ticks(5);

    svg.append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(axis01)
        .select(".domain").remove();
  }
  graph02 = (type) =>{
    var container = document.getElementById(type);
    console.log("it's worked");
  }
  render() {
    return (
      <div className="App">
        <h2>Bar chart use D3.js</h2>
        <div id="type_01">
        </div>
      </div>
    );
  }
}

export default App;
