
const myURL = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
      width = 1200,
      height = 900;

// get data
d3.json(myURL, (error, data) => {
  if(error)  console.log('Error in json call: ' + error);

  console.log(data);
  
  //chart
  let svg = d3.select("#chart")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

  let force = d3.layout.force()
                       .nodes(data.nodes)
                       .links(data.links)
                       .size([width, height])
                       .linkDistance([50])
                       .charge([-100])    
                       .start();
  
  let edges = svg.selectAll("line")
          .data(data.links)
          .enter()
          .append("line")
          .style("stroke", "DarkGrey")
          .style("stroke-width", 1);

  let nodes = svg.selectAll("image")
          .data(data.nodes)
          .enter()
          .append("image")
          .attr("xlink:href", (d) => { 
            let code = d.code;
            if (code === "xk")  code = "rs"
            return "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/flags/4x3/" + code + ".svg";
          })
          .call(force.drag);
  
  force.on("tick", () => {
    edges.attr("x1", (d) => { return d.source.x; })
         .attr("y1", (d) => { return d.source.y; })
         .attr("x2", (d) => { return d.target.x; })
         .attr("y2", (d) => { return d.target.y; });

    nodes.attr("x", (d) => { return d.x-15; })
         .attr("y", (d) => { return d.y-10; })
         .attr("width", "20px")
         .attr("height", "15px");
  });

  //show country name when mouse on. 
  nodes.append("svg:title")
       .text( (d) => { return d.country});

});