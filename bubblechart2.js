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
var id = [];
var svgCircles = [];
d3.json("data.json").then(function(data){
    for(let i = 0; i < 20; i ++){
        circles.push({x: data[i.toString()].x, y: data[i.toString()].y, r: data[i.toString()].r});
    }

    for (let i = 0; i < 20; i++){
        let circle = svg.append("circle")
            .attr("id", "#b"+i)
            .attr("cx", circles[i].x)
            .attr("cy", circles[i].y)
            .attr("r", circles[i].r)
            .style("fill", getRandomColor())
            .style("opacity", "0.7")
            .attr("stroke", "black")
            .attr("transform", "translate(30, -30)");

        svgCircles.push(circle);
        id.push("#b"+ i);
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
});



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
