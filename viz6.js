let width = 900
let height = 520
let margin = 50

let force = 2

let svg = d3.selectAll("body")
.append("svg")
.attr("width", width + margin)
.attr("height", height + margin)
.style("background", "#f9f8f4")
//.style("border", "1px solid #919191")

//scales
let x = d3.scaleLog()
.domain([0,210000000])
.range([0 + margin, width])

let y = d3.scaleLinear()
.domain([0,100])
.range([height, margin])

let size = d3.scaleSqrt()
.range([1,80])

let xScale = d3.fisheye.scale(d3.scaleLog)
.domain([0,210000000])
.range([0 + margin, width])

let yScale = d3.fisheye.scale(d3.scaleLinear)
.domain([0,100])
.range([height, margin])

let xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.format(".2s")).tickSize(-height + margin)

let yAxis = d3.axisLeft(y).ticks(5).tickSize(-width + margin)

let color = d3.scaleLinear()
.interpolate(d3.interpolateHcl)
.range([d3.rgb("#ff0000"), d3.rgb("#0000ff")])

d3.csv("viz_6.csv", function(error, data) {
	if (error) throw error

	x.domain(d3.extent(data, d => +d.muslim_population))

	/*y.domain(d3.extent(data, d => +d.GINI_index))*/

	xScale.domain(d3.extent(data, d => +d.muslim_population))

	/*yScale.domain(d3.extent(data, d => +d.GINI_index))*/

	size.domain(d3.extent(data, d => +d.ff_mln))

	color.domain(d3.extent(data, d => +d.continent))

let enter = svg.selectAll("svg")
	.data(data)
	.enter()

/*enter.append("text")
	.attr("x", d => x(d.muslim_population))
	.attr("y", d => y(d.GINI_index) - 2)
	.text(d => d.country)
	.attr("class", d => "stateLabel_" + d.continent + " label")
	.style("mix-blend-mode", "multiply")*/

/*enter.append("rect")
	.attr("width", d => size(d.ff_mln))
	.attr("height", d => size(d.ff_mln))
	.attr("x", d => x(d.muslim_population) - size(d.ff_mln) / 2)
	.attr("y", d => y(d.GINI_index) - size(d.ff_mln) / 2)
	.attr("class", d => "stateRect_" + d.continent)
	.style("fill-opacity", 0.4)
	.style("fill", "#fcc64f")
	.style("stroke-width", 1)
    .style("stroke", "#fcc64f")
    .style("stroke-opacity", 1)
	.style("mix-blend-mode", "multiply")*/
    /*.on("mouseover", d => {
    	d3.selectAll("rect").style("fill-opacity", 0.1)
    	d3.selectAll("rect").style("stroke-opacity", 0.5)
    	d3.selectAll(".label").style("opacity", 0.1)
        d3.selectAll(".stateRect_" + d.continent).style("fill-opacity", 1)
        d3.selectAll(".stateRect_" + d.continent).style("stroke-opacity", 1)
        d3.selectAll(".stateLabel_" + d.continent).style("opacity", 1)
    })
    .on("mouseout", function() {
        d3.selectAll("rect").style("fill-opacity", 0.3)
        d3.selectAll("rect").style("stroke-opacity", 1)
    	d3.selectAll(".label").style("opacity", 1)
   })*/

/*enter.append("circle")
	.attr("r", 1)
	.attr("cx", d => x(d.muslim_population))
	.attr("cy", d => y(d.GINI_index))
	.style("fill", "#191919")
	.attr("class", d => "stateLabel_" + d.continent + " label")*/

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (height) + ")")
	.call(xAxis)

svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + margin + ",0)")
	.call(yAxis)


let squares = svg.selectAll("svg")
	.data(data)
	.enter()
	.append("rect")
        .attr("class", d => "square_" + d.continent + " square")
	    .style("fill-opacity", 0.4)
		.style("fill", "#fcc64f")
		.style("stroke-width", 1)
	    .style("stroke", "#fcc64f")
	    .style("stroke-opacity", 1)
		.style("mix-blend-mode", "multiply")
	    .attr("width", d => size(d.ff_mln))
		.attr("height", d => size(d.ff_mln))
	    .attr("x", d => x(d.muslim_population) - size(d.ff_mln)/2)
        .attr("y", d => y(d.GINI_index) - size(d.ff_mln)/2)
        .attr("transform", d => `rotate(-45 ${x(d.muslim_population)} ${y(d.GINI_index)})`)
    
    
let circles = svg.append("g")
      .selectAll(".circle")
        .data(data)
       .enter().append("circle")
       	.attr("fill", "#191919")
		.attr("r", 1)
    	.attr("cx", d => x(d.muslim_population))
        .attr("cy", d => y(d.GINI_index))
        .style("mix-blend-mode", "multiply")
	   
let labels = svg.append("g")
      .selectAll(".circle")
        .data(data)
       .enter().append("text")
       	.attr("class", d => "label_" + d.continent + " label")
		.attr("x", d => x(d.muslim_population))
		.attr("y", d => y(d.GINI_index) - 2)
		.text(d => d.country)
		.style("mix-blend-mode", "multiply")

    // Add an x-axis label.
svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", height - 6)
      .text("Muslim population");

// Add a y-axis label.
svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", - margin - 6)
      .attr("y", margin + 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("GINI index");

svg.on("mousemove", function() {
    let mouse = d3.mouse(this);
    xScale.distortion(force).focus(mouse[0]);
    yScale.distortion(force).focus(mouse[1]);

    squares.attr("x", d => xScale(d.muslim_population) - size(d.ff_mln)/2).attr("y", d => yScale(d.GINI_index) - size(d.ff_mln)/2)
    .attr("transform", d => `rotate(-45 ${xScale(d.muslim_population)} ${yScale(d.GINI_index)})`)
    circles.attr("cx", d => xScale(d.muslim_population)).attr("cy", d => yScale(d.GINI_index))
    labels.attr("x", d => xScale(d.muslim_population)).attr("y", d => yScale(d.GINI_index) - 2)

    xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.format(".2s")).tickSize(-height + margin)
    yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-width + margin)
    svg.select(".x.axis").call(xAxis)
    svg.select(".y.axis").call(yAxis)
})

/*squares.on("mouseover", d => {
		d3.selectAll("label").style("fill-opacity", 0.1)
		d3.selectAll(".square_" + d.continent).style("fill-opacity", 1)
		d3.selectAll(".label_" + d.continent).style("fill-opacity", 1)
	})*/

squares.on("mouseout", function() {
		d3.selectAll(".square").style("fill-opacity", 0.4)
	})

svg.on("mouseout", function() {
    reset()
    })

function reset() {
    squares.attr("x", d => x(d.muslim_population) - size(d.ff_mln)/2).attr("y", d => y(d.GINI_index) - size(d.ff_mln)/2)
    .attr("transform", d => `rotate(-45 ${x(d.muslim_population)} ${y(d.GINI_index)})`)
    
    circles.attr("cx", d => x(d.muslim_population)).attr("cy", d => y(d.GINI_index))
    labels.attr("x", d => x(d.muslim_population)).attr("y", d => y(d.GINI_index) - 2)

    xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.format(".2s")).tickSize(-height + margin)
	yAxis = d3.axisLeft(y).ticks(5).tickSize(-width + margin)
	svg.select(".x.axis").call(xAxis)
    svg.select(".y.axis").call(yAxis)
	}

})