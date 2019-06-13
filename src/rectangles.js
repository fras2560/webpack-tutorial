import {Rectangle} from "./rectangle";
export class Rectangles{
  constructor(){
    this._rectangles = [];
  }

  add(rectangle) {
    this._rectangles.push(rectangle)
  }

  totalPerimeter() {
    let perimeter = 0;
    this._rectangles.forEach(function(rectangle){
      perimeter += rectangle.perimeter();
    });
    return perimeter;
  }

  totalArea() {
    let area = 0;
    this._rectangles.forEach(function(rectangle){
      area += rectangle.area();
    });
    return area;
  }
}
