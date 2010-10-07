var h;
$(function() {
  
  var paper = Raphael(50,50,screen.width,screen.height);
  
  h = new Hex(paper) 
  
})

var Hex = function(paper)
{
  var set = paper.set()
  this.p = paper.path("M 0,0 l 100,0 50,86.6 -50,86.6 -100,0 -50,-86.6 50,-86.6 z");
  this.p
    .attr(
      {"fill": "#fff",
      "stroke-width": 0,
      "stroke": "#fff",
      })
 
 set.push(this.p)
 
 var line = function(path)
 {
   var p = paper.path(path);
   p.attr({"stroke-linejoin": "round"})
   set.push(p);
   return p;
 }   
 
 var lines = {
  a: line("M 0,0 l 100,0 z"),
  b: line("M 100,0 l 50,86.6 z"),
  c: line("M 150,86.6 l -50,86.6 z"),
  d: line("M 100,173.2 l -100,0 z"),
  e: line("M 0,173.2 l -50,-86.6 z"),
  f: line("M -50,86.6 l 50,-86.6 z")
 }
 
 lines.e.attr({"stroke-width":10})
 lines.d.attr({"stroke-width":10})
 lines.a.attr({"stroke-width":10})
 
 set.translate(100,100)
 
 
 
}

Hex.prototype.Rotate = function(r)
{
  this.p.animate({"rotation": this.p.attr("rotation") + r*60 }, 500)
} 