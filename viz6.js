let width = 900
let height = 520
let margin = 20

let svg = d3.selectAll("body")
.append("svg")
.attr("width", width + 100)
.attr("height", height + 100)
.style("background", "#f9f8f4")
//.style("border", "1px solid #919191")



//scales
let x = d3.scaleLog()
.range([0 + margin, width])

let y = d3.scaleLog()
.range([height, 50])

let size = d3.scaleSqrt()
.range([1,60])

let color = d3.scaleLinear()
.interpolate(d3.interpolateHcl)
.range([d3.rgb("#ff0000"), d3.rgb("#0000ff")])

let highlightedRect = d3.select(null)

let xAxis = d3.axisBottom(x)
	.ticks(10)

let yAxis = d3.axisLeft(y)
	.ticks(10)

d3.csv("viz_6.csv", function(error, data) {
	if (error) throw error

	x.domain(d3.extent(data, d => +d.muslim_population))

	y.domain(d3.extent(data, d => +d.GINI_index))

	size.domain(d3.extent(data, d => +d.ff_mln))

	color.domain(d3.extent(data, d => +d.continent))

let enter = svg.selectAll("svg")
	.data(data)
	.enter()

enter.append("text")
	.attr("x", d => x(d.muslim_population))
	.attr("y", d => y(d.GINI_index))
	.text(d => d.country)
	.attr("class", d => "stateLabel_" + d.continent + " label")
	.style("mix-blend-mode", "multiply")

/*enter.append("text")
	.attr("x", d => x(d.priceperlb))
	.attr("y", d => y(d.totalprod) - 12)
	.text(d => d.year)
	.attr("class", d => "stateYear_" + d.state + " year")
	.style("fill", d => color(d.year))
	.style("mix-blend-mode", "multiply")*/

enter.append("rect")
	.attr("width", d => size(d.ff_mln))
	.attr("height", d => size(d.ff_mln))
	.attr("x", d => x(d.muslim_population))
	.attr("y", d => y(d.GINI_index))
	.attr("class", d => "stateRect_" + d.continent)
	.style("fill-opacity", 0.4)
	.style("fill", /*d => color(d.year)*/ "#fcc64f")
	.style("stroke-width", 2)
    .style("stroke", "#fcc64f")
    .style("stroke-opacity", 1)
	.style("mix-blend-mode", "multiply")
    .on("mouseover", d => {
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
   })


/*enter.append("line")
	.attr("x1", d => x(d.priceperlb))
	.attr("y1", d => y(d.totalprod))
	.attr("x2", d => x(d.priceperlb) + 100)
	.attr("y2", d => y(d.totalprod) + 100)
	.attr("stroke", "#000000")
	.attr("stroke-width", 0.5)*/

/* linee di collegamento stesso State

let dataByState = d3.nest()
  .key( d=> d.state)
  .entries(data)

let lineGenerator = d3.line()
    .x( d=> x(d.priceperlb))
    .y( d=> y(d.totalprod))

dataByState.forEach( state => {
	let lineData = state.values

	svg.append("path")
	  .attr("d", lineGenerator(lineData))
	  .attr("stroke", "black")
	  .attr("stroke-width", 1)
	  .attr("fill", "none")
	  .attr("class", d => "stateLine_" + state.key)
	  .attr("opacity", 0)
	})*/

})

	/*prendere i data point
	grupparli per stato (d3.nest) -> ciclo per ogni stato, dentro ogni stato un altro ciclo per ogni anno
	ordinarli per data
	disegnare path per ogni g stato
	path ha dentro tutti i punti (ogni data)*/

	//console.log(JSON.stringify(data, null, "\t"));
