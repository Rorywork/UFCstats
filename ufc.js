d3.csv("ufc-data.csv", function(data){
   
   console.log(data);
   
    
    var fighters = d3.select("svg")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
            .attr("class", "fighter")
            .attr("transform", function(d){
                return "translate(" + ((3000 * d.win)-1500 ) + "," + (2600-(12 * d.height)) + ")";
            })
        .on("mouseover", function(d){
            d3.select("#fighter").raise()
                .append("text")
                .attr("class", "fightername")
                .text(d.fighter)
            d3.select("#strikes").raise()
                .append("text")
                .attr("class", "stats")
                .text(d.slpm)
            d3.select("#takedowns").raise()
                .append("text")
                .attr("class", "stats")
                .text(d.td)
        })
            .on("mouseout", function(d){
                d3.selectAll("text.fightername").remove();
                d3.selectAll("text.stats").remove();
            })
          

    
    
    fighters.append("circle")
        .attr("r", function(d){
            return d.fights_in_UFC * 2
        })
        .attr("fill", function(d) {
            if (d.division == "Heavyweight") {
                return "red";
            } 
            if (d.division == "Light Heavyweight") {
                return "orange";
            }     
            if (d.division == "Middleweight") {
                return "yellow";
            } 
            if (d.division == "Welterweight") {
                return "green";
            }     
            if (d.division == "Lightweight") {
                return "blue";
            }     
            if (d.division == "Featherweight") {
                return "brown";
            }  
            if (d.division == "Bantamweight") {
                return "purple";
            } 
            else{
                return "pink";
            }
        })

    

    var fighters = d3.nest()
        .key(function(d){ return d.division})
            .rollup(function(a){ return a.length; })
        .entries(data);
        
    fighters.unshift({"key": "ALL",
                    "value": d3.sum(fighters, function(d){ return d.value;})
    })
        
    var selector = d3.select("#selector");
    
    selector
        .selectAll("option")
        .data(fighters)
        .enter()
        .append("option")
            .text(function(d){ return d.key + ":" + d.value;})
            .attr("value", function(d){ return d.key;})
    
    selector    
        .on("change", function(){
            d3.selectAll(".fighter")
                .attr("opacity", 1.0);
            var value = selector.property("value");
                if(value != "ALL") {
                    d3.selectAll(".fighter")
                        .filter(function(d) { return d.division != value; })
                        .attr("opacity", 0.1);
                }
        })
    
  
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})