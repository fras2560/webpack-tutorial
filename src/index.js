import {Rectangles} from "./rectangles";
import {Rectangle} from "./rectangle";

let rectangles = new Rectangles();
let output= [];

rectangles.add(new Rectangle(1, 1));
output.push("1x1 Rectangle perimeter:" + rectangles.totalPerimeter());
output.push("1x1 Rectangle area:" + rectangles.totalArea());
console.log(rectangles.totalPerimeter());
console.log(rectangles.totalArea());


rectangles.add(new Rectangle(2, 2));
output.push("2x2 Rectangle perimeter:" + rectangles.totalPerimeter());
output.push("2x2 Rectangle area:" + rectangles.totalArea());

console.log(rectangles.totalPerimeter());
console.log(rectangles.totalArea());


let element = document.getElementById('wrapper');
let paragraph, content;
output.forEach(function(result){
  paragraph = document.createElement("p")
  content = document.createTextNode(result);
  paragraph.appendChild(content);
  element.appendChild(paragraph);
})


