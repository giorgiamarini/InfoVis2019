var margin = {top: 20, right: 10, bottom: 30, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

svg = d3.select("#infovis").append("svg");
svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
svg.append("g")
    .attr("transform", "translate(20, "+  height + ")")
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .domain([0, 90])
    .range([ height, 0]);
svg.append("g")
    .attr("transform", "translate(20,0)")
    .call(d3.axisLeft(y));

var circles = [];
var svgCircles = [];
var i = 0;
var id_index = 0;
while (i < 20) {
    var x = Math.floor(Math.random() * (width - 100) + 1);
    var y = Math.floor(Math.random() * (height - 100) + 1);
    var r = Math.floor(Math.random() * 50 + 1);

    var overlap = false;
    var j = 0;
    while (j < circles.length && !overlap) {
        let other = circles[j];
        let d = dist(x, y, other.x, other.y);
        if (d < r + other.r)
            overlap = true;

        j ++;
    }

    if (x < r + 25 || y < r + 25)
        overlap = true;

    if (!overlap) {
        circles.push({x: x, y: y, r: r});

        let circle = svg.append("circle")
            .attr("id", "b"+id_index)
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", r)
            .style("fill", getRandomColor())
            .style("opacity", "0.7")
            .attr("stroke", "black")
            .attr("transform", "translate(30, -30)");
        i++;
        id_index++;
        svgCircles.push(circle);
    }
}

var clickNumber = 0;
svg.selectAll("circle")
    .on("click", function(){
        if (clickNumber == 0){
            console.log("click 1");
        let v = 0;
        svgCircles.forEach(function(element, index){
            d3.select("#b"+ index)
                .transition().duration(2000)
                .attr("r", circles[v].y * 0.10)
                .attr("cx", circles[v].r * 10)
                .attr("cy", circles[v].x * 0.60);
            v++;

        });
        clickNumber = 1;
        }
        else {
        if (clickNumber == 1) {
            console.log("click 2");
            let v = 0;
            svgCircles.forEach(function(element, index){
                d3.select("#b"+ index)
                    .transition().duration(2000)
                    .attr("r", circles[v].x * 0.10)
                    .attr("cx", circles[v].y * 0.60)
                    .attr("cy", circles[v].r * 10);
                v++;

            });
            clickNumber = 2;
        } else {

        if (clickNumber == 2) {
            console.log("click 3");
            let v = 0;
            svgCircles.forEach(function(element, index){
                d3.select("#b"+ index)
                    .transition().duration(2000)
                    .attr("r", circles[v].r)
                    .attr("cx", circles[v].x)
                    .attr("cy", circles[v].y);
                v++;
            });
            clickNumber = 0;

        } } }
    });


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}
