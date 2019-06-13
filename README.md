# webpack-tutorial

## TLDR
```
npm install
npm start
```
should open a browser in chrome with some text and making any changes in an editor should be reflected upon save

## Walkthrough
This is my notes from going through a webpack tutorial. I used the following tutorial as a starting point but adjusted it to not use react. https://www.valentinog.com/blog/babel/

### Webpack Setup
There is some dependencies we need to install before starting


```
npm init -y
npm i webpack --save-dev
npm i webpack-cli --save-dev
```

Now will need to tell npm to use webpack when building. Need to add the scripts attribute in the file _package.json_
```
"scripts": {
 "build": "webpack --mode production"
}
```

Now at this point can define a minimal webpack configuration. Create a file named _webpack.config.js_ and fill in the following:
```
module.exports = {
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     }
   ]
 }
};
```

### Babel and transpiling ES6
The babel load is what enables Webpack to support older browsers such as IE. The code will get transpiled into ES2015 code. So will need the dependency :
```
npm i @babel/core babel-loader @babel/preset-env
```


### Writing some code (feel to write whatever you want)
The next is to start to use some code that has classes and other ES6 specialities. I used the four following files to try some things out. Any code will need to be added to _src_ folder

_rectangle.js_
```
export class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area(){
    return this.height * this.width;
  }

  perimeter(){
    return this.height * 2 + this.width * 2;
  }
}
```

_rectangles.js_
```
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
```

_index.js_
```
import {Rectangles} from "./rectangles";
import {Rectangle} from "./rectangle";

let rectangles = new Rectangles();

rectangles.add(new Rectangle(1, 1));

console.log(rectangles.totalPerimeter());
console.log(rectangles.totalArea());


rectangles.add(new Rectangle(2, 2));
console.log(rectangles.totalPerimeter());
console.log(rectangles.totalArea());
```

_index.html_
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>How to set up Webpack, and Babel</title>
</head>

<body>
    <div id="wrapper">
    </div>
</body>
</html>
```



### Bundle it together
Now we can produce our code and have it bundled together. Want to have Webpack produce a HTML page with all the JS bundled together.
We will need two dependencies: html-webpack-plugin & html-loader
```
npm i html-webpack-plugin html-loader --save-dev
```


Finally, need to update the _webpack.config.js_
```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     },
     {
       test: /\.html$/,
       use: [
         {
           loader: "html-loader"
         }
       ]
     }
   ]
 },
 plugins: [
   new HtmlWebPackPlugin({
     template: "./src/index.html",
     filename: "./index.html"
   })
 ]
};
```

Now running `npm run build` will result in a _dist_ folder being created with an _index.html_ and a _main.js_. This index.html can be opened up in any browser and should display some text. The ES6 classes will be compiled to something supported by IE.


### Automatic Code Builds/Refresh
A development server can be used so that when you make a change to the file you do not need to do another build. To setup we need a _webpack-dev-server_
```
npm i webpack-dev-server --save-dev
```

Now just to need to the scripts of _package.json_ the following line:
```
"scripts": {
 "start": "webpack-dev-server --open --mode development",
 "build": "webpack --mode production"
}
```
Now running the command `npm start` will open up a webpage in your browser. Whenever you edit a file it will change the webpage in the browser.

