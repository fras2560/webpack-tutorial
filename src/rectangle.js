export class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area(){
    return this.height * this.width;
  }

  perimeter(){
    return this.height * 3 + this.width * 3;
  }
}