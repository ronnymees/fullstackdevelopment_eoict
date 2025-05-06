# Advanced JavaScript

## Node.js

> Source: <https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/>

Node.js is a JavaScript runtime environment. Sounds great, but what does that mean? How does that work

The Node.js run-time environment includes everything you need to execute a program written in JavaScript.

![Java Runtime Environment vs Node.j](./images/image1.png)

If you know Java, here’s a little analogy.

Node.js came into existence when the original developers of JavaScript extended it from something you could only run in the browser to something you could run on your machine as a standalone application.

Now you can do much more with JavaScript than just making websites interactive.

JavaScript now has the capability to do things that other scripting languages like Python can do.

Both your browser JavaScript and Node.js run on the V8 JavaScript runtime engine. This engine takes your JavaScript code and converts it into a faster machine code. Machine code is low-level code which the computer can run without needing to first interpret it.

### Why Node.js

Here’s a formal definition as given on the official Node.js website:

> Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine.
>
> Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
>
> Node.js’ package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

We already discussed the first line of this definition: “Node.js® is a JavaScript runtime built on Chrome’s V8 JavaScript engine.” Now let’s understand the other two lines so we can find out why Node.js is so popular.

I/O refers to input/output. It can be anything ranging from reading/writing local files to making an HTTP request to an API.

I/O takes time and hence blocks other functions.

Consider a scenario where we request a backend database for the details of user1 and user2 and then print them on the screen/console. The response to this request takes time, but both of the user data requests can be carried out independently and at the same time.

![Blocking vs non blocking IO](./images/image2.png)

#### Blocking I/O

In the blocking method, user2's data request is not initiated until user1's data is printed to the screen.

If this was a web server, we would have to start a new thread for every new user. But JavaScript is single-threaded (not really, but it has a single-threaded event loop, which we’ll discuss a bit later). So this would make JavaScript not very well suited for multi-threaded tasks.

That’s where the non-blocking part comes in.

#### Non-blocking I/O

On the other hand, using a non-blocking request, you can initiate a data request for user2 without waiting for the response to the request for user1. You can initiate both requests in parallel.

This non-blocking I/O eliminates the need for multi-threading since the server can handle multiple requests at the same time.

#### The JavaScript event loop

If you have 26 minutes, watch [this](https://www.youtube.com/watch?v=8aGhZQkoFbQ) excellent video explanation of the Node Event Loop:

Otherwise, here’s a quick step-by-step explanation of how the JavaScript Event Loop works.

![Eventloop](./images/image3.png)

1. Push `main()` onto the call stack.
2. Push `console.log()` onto the call stack. This then runs right away and gets popped.
3. Push `setTimeout(2000)` onto the stack. `setTimeout(2000)` is a Node API. When we call it, we register the event-callback pair. The event will wait 2000 milliseconds, then callback is the function.
4. After registering it in the APIs, `setTimeout(2000)` gets popped from the call stack.
5. Now the second `setTimeout(0)` gets registered in the same way. We now have two Node APIs waiting to execute.
6. After waiting for 0 seconds, `setTimeout(0)` gets moved to the callback queue, and the same thing happens with setTimeout(2000).
7. In the callback queue, the functions wait for the call stack to be empty, because only one statement can execute a time. This is taken care of by the event loop.
8. The last `console.log()` runs, and the `main()` gets popped from the call stack.
9. The event loop sees that the call stack is empty and the callback queue is not empty. So it moves the callbacks (in a first-in-first-out order) to the call stack for execution.

### NPM

These are libraries built by the awesome community which will solve most of your generic problems. npm (Node package manager) has packages you can use in your apps to make your development faster and efficient.

#### Require

Require does three things:

* It loads modules that come bundled with Node.js like file system and HTTP from the Node.js API .
* It loads third-party libraries like Express and Mongoose that you install from npm.
* It lets you require your own files and modularize the project.

Require is a function, and it accepts a parameter “path” and returns `module.exports`.

#### Node Modules

A Node module is a reusable block of code whose existence does not accidentally impact other code.

You can write your own modules and use it in various application. Node.js has a set of built-in modules which you can use without any further installation.

#### V8 turbo-charges JavaScript by leveraging C++

V8 is an open source runtime engine written in C++.

JavaScript -> V8(C++) -> Machine Code

V8 implements a script called ECMAScript as specified in ECMA-262. ECMAScript was created by Ecma International to standardize JavaScript.

V8 can run standalone or can be embedded into any C++ application. It has hooks that allow you to write your own C++ code that you can make available to JavaScript.

This essentially lets you add features to JavaScript by embedding V8 into your C++ code so that your C++ code understands more than what the ECMAScript standard otherwise specifies.

There are many different JavaScript runtime engines apart from V8 by Chrome like SpiderMonkey by Mozilla, Chakra by Microsoft, etc.

### Events

Something that has happened in our app that we can respond to. There are two types of events in Node.

* System Events: C++ core from a library called libuv. (For example, finished reading a file).
* Custom Events: JavaScript core.

### Writing Hello World in Node.js

We have to do this, don’t we?

Make a file `app.js` and add the following to it.

```javascript
console.log("Hello World!");
```

Open your node terminal, change the directory to the folder where the file is saved and run `node app.js`.

Bam — you’ve just written Hello World in Node.js.

## `let`, `const` and `var`

> Source: <https://www.freecodecamp.org/news/learn-es6-the-dope-way-i-const-let-var-ae828580472b/>

First up, what’s the deal with `const`, `let`, and `var`?

You’ve probably witnessed one of these situations — `let` and/or `const` being substituted for `var`, or `let` and `const` being used together in the same code, or even more perplexing: `let`, `const` AND `var` all being used at once!

Hey no worries, I got you. Let’s clear this fog together:

### const

Benefits:

* Useful if you’re setting a variable that you don’t plan on changing.
* Protects and prevents your variables from reassignment.
* In compiled languages, there is an increase in runtime efficiency of your code and thus an overall performance boost vs using plain ‘ol var.

Beware:

* Works as it should in Chrome and Firefox. But not in Safari. Instead it acts as a normal variable, as if it were var, and thus can be reassigned.
* Generally there is programming convention to set the name in all caps to show others reading your code that the value of the const value should not be changed — you will witness both lowercase and caps const coding situations. Just something to be aware of.

Examples:

```javascript
// sometimes used as lowercase as when setting up your server.
const express = require('express');
const app = express();

// sometimes uppercase.
const DONT_CHANGE_ME_MAN = "I ain't changing for no one, man."

// change attempt #1
const DONT_CHANGE_ME_MAN = "I told I ain’t changing for no one."
// change attempt #2
var DONT_CHANGE_ME_MAN = "Still not changing, bro."
// change attempt #3
DONT_CHANGE_ME_MAN = "Haha, nice try, still not happening."

// same error for all 3 attempts, const value stays the same:
Uncaught TypeError: Identifier 'const DONT_CHANGE_ME_MAN' has already been declared.

// DONT_CHANGE_ME_MAN still results in “I ain’t changing for no one, man.”
```

Does that make sense?

### let

Students and experienced programmers coming from a Ruby or Python background will love `let`, as it enforces **block scoping**!

As you migrate over to ES6 country, you may notice yourself adjusting to a new let metamorphosis taking over your coding style, and find yourself less likely to using var anymore. With let it’s so much more clear now where your values are coming from without worrying about them being hoisted!

Benefits:

* Block-Scoping, your variable’s values are exactly as they should be in that current scope and they are not hoisted as with var.
* Super useful if you don’t want your values to be overwritten, like in a for loop.

Beware:

* You may not always want to use let. For example in situations where variables aren’t as easily block scoped, var may be more convenient.

Examples:

```javascript
// When using var what do we get?
var bunny = "eat carrot";

if(bunny) {
  var bunny = "eat twig";
  console.log(bunny) //  "eat twig"
}

console.log(bunny)// "eat twig"

// When using let what do we get?
let bunny = "eat carrot";

if(bunny) {
  let bunny = "eat twig";
  console.log(bunny) // "eat twig"
}

console.log(bunny)// "eat carrot"
```

Do you see the difference? It’s all about scope. With `var`, it has access to it’s parent/outer scope and thus can change the value inside the if statement. Unlike let which is block-scoped and can only be altered within the current scope it’s in.

let is super straight-forward. It’s like a person who speaks straight to your face and tells you exactly what they need right then and there while var does this as well but may occasionally reply with unexpected answers — due to hoisting and access to outer scope variables. Depending on the situation either one may be in your favor.

Another great example on the benefits of let:

Say you want to create a game board of 30 divs and each one has their own value. If you were to do this with `var`, the `i` index would be overwritten for every iteration — every single div would have the value of 30! Yikes!

On the other hand, with let, every div has its own value, as its own div scope is maintained for each iteration! See the difference:

```javascript
// with var. See example live: https://jsfiddle.net/maasha/gsewf5av/
for(var i= 0; i<30; i++){
  var div = document.createElement('div');
  div.onclick = function() {
    alert("you clicked on a box " + i);
   };
   document.getElementsByTagName('section')[0].appendChild(div);
}
```

```javascript
// with let. See example live: https://jsfiddle.net/maasha/xwrq8d5j/
for(let i=0; i<30; i++) {
  var div=document.createElement(‘div’);
  div.onclick = function() {
    alert("you clicked on a box " + i);
   };
   document.getElementsByTagName('section')[0].appendChild(div);
}
```

## Arrow Functions

> Source: <https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/>

### So, what the heck is `=>`

You’ve probably seen these strange Egyptian-looking hieroglyphics symbols here and there, especially in someone else’s code, where you’re currently debugging a `this` keyword issue. After an hour of tinkering, you’re now roaming the Google search bar and stalking Stack Overflow. Sound familiar?

Together, let’s cover three topics:

* How the `this` keyword relates to `=>`.
* How to migrate functions from ES5 to ES6.
* Important quirks to be aware of when using `=>`.

### Arrow Functions: `=>`

Arrow functions were created to simplify function scope and make using the `this` keyword much more straightforward. They utilize the `=>` syntax, which looks like an arrow. Even though I don’t think it needs to go on a diet, people call it “the fat arrow” (and Ruby enthusiasts may know it better as the “hash rocket” ) — something to be aware of.

### How the `this` keyword relates to Arrow Functions

Before we dive deeper into ES6 arrow functions, it’s important to first have a clear picture of what `this` binds to in ES5 code.

If the `this` keyword were inside an object’s **method** (a function that belongs to an object), what would it refer to?

```javascript
// Test it here: https://jsfiddle.net/maasha/x7wz1686/
var bunny = {
  name: 'Usagi',
  showName: function() {
    alert(this.name);
  }
};

bunny.showName(); // Usagi
```

Correct! It would refer to the object. We’ll get to why later on.

Now what about if the `this` keyword were inside of method’s function

```javascript
// Test it here: https://jsfiddle.net/maasha/z65c1znn/
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks: function() {
    this.tasks.forEach(function(task) {
      alert(this.name + " wants to " + task);
    });
  }
};

bunny.showTasks();
// [object Window] wants to transform
// [object Window] wants to eat cake
// [object Window] wants to blow kisses

// please note, in jsfiddle the [object Window] is named 'result' within inner functions of methods.
```

What did you get? Wait, what happened to our bunny…?

Ah, did you think `this` refers to the method’s inner function?

Perhaps the object itself?

You are wise to think so, yet it is not so. Allow me to teach you what the coding elders had once taught me:

Coding Elder: “_Ah yes, the code is strong with this one. It is indeed practical to think that the `this` keyword binds to the function but the truth is, `this` has now fallen out of scope… It now belongs to…”, he pauses as if experiencing inner turmoil, “the window object._”

That’s right. That’s exactly how it happened.

Why does `this` bind to the window object? **Because `this`, always references the owner of the function it is in, for this case — since it is now out of scope — the window/global object.**

When it is inside of an object’s method — the function’s owner is the object. Thus the `this` keyword is bound to the object. Yet when it is inside of a function, either stand alone or within another method, it will always refer to the window/global object.

```javascript
// Test it here: https://jsfiddle.net/maasha/g278gjtn/
var standAloneFunc = function(){
  alert(this);
}

standAloneFunc(); // [object Window]
```

But why…?

This is known as a JavaScript quirk, meaning something that just happens within JavaScript that isn’t exactly straightforward and it doesn’t work the way you would think. This was also regarded by developers as a poor design choice, which they are now remedying with ES6's arrow functions.

Before we continue, it’s important to be aware of two clever ways programmers solve the `this` problem within ES5 code, especially since you will continue to run into ES5 for awhile (not every browser has fully migrated to ES6 yet):

**1 Create a variable outside of the method’s inner function**

Now the ‘forEach’ method gains access to `this` and thus the object’s properties and their values. This is because `this` is being stored in a variable while it is still within the scope of the object’s direct method ‘showTasks’.

```javascript
// Test it here: https://jsfiddle.net/maasha/3mu5r6vg/
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks: function() {
    var _this = this;
    this.tasks.forEach(function(task) {
      alert(_this.name + " wants to " + task);
    });
  }
};

bunny.showTasks();
// Usagi wants to transform
// Usagi wants to eat cake
// Usagi wants to blow kisses
```

**2 Use bind to attach the `this` keyword that refers to the method to the method’s inner function**

```javascript
// Test it here: https://jsfiddle.net/maasha/u8ybgwd5/
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks: function() {
    this.tasks.forEach(function(task) {
      alert(this.name + " wants to " + task);
    }.bind(this));
  }
};

bunny.showTasks();
// Usagi wants to transform
// Usagi wants to eat cake
// Usagi wants to blow kisses
```

And now introducing…Arrow functions! Dealing with `this` issue has never been easier and more straightforward! The simple ES6 solution:

```javascript
// Test it here: https://jsfiddle.net/maasha/che8m4c1/
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks() {
    this.tasks.forEach((task) => {
      alert(this.name + " wants to " + task);
    });  
  }
};

bunny.showTasks();
// Usagi wants to transform
// Usagi wants to eat cake
// Usagi wants to blow kisses
```

While in ES5 `this` referred to the parent of the function, in ES6, arrow functions use lexical scoping — `this` refers to it’s current surrounding scope and no further. Thus the inner function knew to bind to the inner function only, and not to the object’s method or the object itself.

### How to migrate functions from ES5 to ES6

```javascript
// Before
let bunny = function(name) {
  console.log("Usagi");
}
```

* **Step 1**: Remove the word `function`.

  ```javascript
  let bunny = (name) {
    console.log("Usagi");
  }
  ```

* **Step 2**: If your code is less than a line, remove brackets and place on one line.

  ```javascript
  let bunny = (name) console.log("Usagi");
  ```

* **Step 3**. Add the hash rocket.

  ```javascript
  let bunny = (name) => console.log("Usagi");
  ```

```javascript
// After
let bunny = (name) => console.log("Usagi")
```

You did it! Great job! Simple enough right? Here are a few more examples utilizing the fat — er skinny arrow, to get your eyes accustomed:

1. ES6: if passing one argument you don't need to include parenthesis around parameter.

  ```javascript
  var kitty = name => name;

  // same as ES5:
  var kitty = function(name) {
    return name;
  };
  ```

2. ES6: no parameters example.
  
  ```javascript
  var add = () => 3 + 2;

  // same as ES5:
  var add = function() {
    return 3 + 2;
  };
  ```

3. ES6: if function consists of more than one line or is an object, include braces.

  ```javascript
  var objLiteral = age => ({ name: "Usagi", age: age });

  // same as ES5:
  var objLiteral = function(age) {
    return {
      name: "Usagi",
      age: age
    };
  };
  ```

4. ES6: promises and callbacks.

  ```javascript
  asyncfn1()
    .then(() => asyncfn2())
    .then(() => asyncfn3())
    .then(() => done());

  // same as ES5:
  asyncfn1().then(function() {
    asyncfn2();
  }).then(function() {
    asyncfn3();
  }).done(function() {
    done();
  });
  ```

Important quirks to be aware of when using Arrow functions

If you use the `new` keyword with `=>` functions it will throw an error. Arrow functions can’t be used as a constructor — normal functions support the `new` via the property prototype and internal method \[\[Construct\]\]. Arrow functions don’t use neither, thus the new `(() => {})` throws an error.

Further quirks to consider:

```javascript
// Line breaks are not allowed and will throw a syntax error
let func1 = (x, y)
=> {
  return x + y;
}; // SyntaxError

// But line breaks inside of a parameter definition is ok
let func6 = (
  x,
  y
) => {
  return x + y;
}; // Works!

// If an expression is the body of an arrow function, you don’t need braces:
asyncFunc.then(x => console.log(x));

// However, statements have to be put in braces:
asyncFunc.catch(x => { throw x });

// Arrow functions are always anonymous which means you can’t just declare
// them as in ES5:
function squirrelLife() {
  // play with squirrels, burrow for food, etc.
}

// Must be inside of a variable or object property to work properly:
let squirrelLife = () => {
  // play with squirrels, burrow for food, etc.
  // another super squirrel action.
}

```

---

### Summary

An arrow function expression is a syntactically compact alternative to a regular function expression, although without its own bindings to the `this`, `arguments`, `super`, or `new.target` keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.

Arrow functions can be used in most cases. They provide just a shorter syntax. You can omit the `function` keyword. In return you add an `=>` symbol after the argument list. This explains why the are called `arrow` functions.

Regular function syntax:

```js
const sayHello = function(name) {
  return `Hello ${name}!`
}
```

Arrow function  syntax:

```js
const sayHello = (name) => {
  return `Hello ${name}!`
}
```

::: tip 💡 Arrow function syntax
The `function` keyword is omitted, and instead an `=>` is inserted after the argument list
:::

### Even Shorter

Whenever you only have a single expression inside the arrow function body, you can omit the `{}` brackets as well. The statement is also returned by default. Resulting in an even shorter syntax.

```js
const sayHello = (name) => `Hello ${name}!`
```

### Arrow Function Arguments

If an arrow function provides any arguments, they can be listed between the () parentheses.

When there is only one argument, the parentheses even become optional:

```js
const sayHello = name => `Hello ${name}!`
```

When no arguments are needed, an empty pair of parentheses is used:

```js
const sayHello = () => `Hello World!`
```

### Functions as Function Arguments

Arrow functions are extremely useful when you need to use functions as arguments.

```js
waitForResult()
.then( result => console.log(result) )
```

this equals to

```js
waitForResult()
.then( function(result) {
  console.log(result)
})
```

## Template literals

> Source: <https://www.freecodecamp.org/news/learn-es6-the-dope-way-part-iii-template-literals-spread-operators-generators-592765337294/>

Benefits:

* Easy expression interpolation and method calls! See examples below.
* Including complex information in the format you want is simple!
* You don’t need to worry about multiple quotation marks, multi-lines, spaces, or using `+` sign either! Only two **back ticks** recognize all the information inside of them! Woohoo!

Beware:

* Commonly called “Template Strings”, as this was their name in prior editions of ES2015 / ES6 specification.
* constiables and parameters need to be wrapper in dollar sign and curly braces, ie. placeholder `${EXAMPLE}`.
* The plus sign,`+`, inside of a Template Literal literally acts as a math operation, not a concatenation if also inside `${}`. See examples below for further explanation.

### Migrating to Template Literal Syntax

After reviewing the benefits and items to be aware of, take note of these examples and study the subtle differences with using Template Literals:

Example 1:

```javascript
// Before:
function sayHi(petSquirrelName) { console.log('Greetings ' + petSquirrelName + '!'); }
sayHi('Brigadier Sir Nutkins II'); // => Greetings Brigadier Sir Nutkins II!

// After:
function sayHi(petSquirrelName) { console.log(`Greetings ${petSquirrelName}!`); }
sayHi('Brigadier Sir Nutkins II'); // => Greetings Brigadier Sir Nutkins II!
```

Example 2:

```javascript
// Before:
console.log('first text string \n' + 'second text string');
// => first text string
// => second text string

// After:
console.log(`first text string
 second text string`);
// => first text string
// => second text string
```

Example 3:

```javascript
// Before:
const num1 = 5;
const num2 = 10;
console.log('She is ' + (num1 + num2) +  ' years old and\nnot ' + (2 * num1 + num2) + '.');
// => She is 15 years old and
// => not 20.

// After:
const num1 = 5;
const num2 = 10;
console.log(`She is ${num1 + num2} years old and\nnot ${2 * num1 + num2}.`);
// => She is 15 years old and
// => not 20.
```

Example 4:

```javascript
// Before:
const num1 = 12;
const num2 = 8;
console.log('The number of JS MVC frameworks is ' + (2 * (num1 + num2)) + ' and not ' + (10 * (num1 + num2)) + '.');
//=> The number of JS frameworks is 40 and not 200.

// After:
const num1 = 12;
const num2 = 8;
console.log(`The number of JS MVC frameworks is ${2 * (num1 + num2)} and not ${10 * (num1 + num2)}.`);
//=> The number of JS frameworks is 40 and not 200.
```

Example 5:

```javascript
// The ${} works fine with any kind of expression, including method calls:
// Before:
const registeredOffender = {name: 'Bunny BurgerKins'};
console.log((registeredOffender.name.toUpperCase()) + ' you have been arrested for the possession of illegal carrot bits!');
// => BUNNY BURGERKINS you have been arrested for the possession of illegal carrot bits!

// After:
const registeredOffender = {name: 'Bunny BurgerKins'};
console.log(`${registeredOffender.name.toUpperCase()} you have been arrested for the possession of illegal carrot bits!`);
// => BUNNY BURGERKINS you have been arrested for the possession of illegal carrot bits!
```

## JavaScript Classes

> Source: <https://www.w3schools.com/js/js_classes.asp>

ES6, also known as ECMAScript2015, introduced classes.

A class is a type of function, but instead of using the keyword `function` to initiate it, we use the keyword `class`, and the properties are assigned inside a `constructor()` method.

### Class Definition

Use the keyword class to create a `class`, and always add the `constructor()` method.

The constructor method is called each time the class object is initialized.

Example:

A simple class definition for a class named "Car":

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
}
```

Now you can create objects using the Car class:

```js
const mycar = new Car('Ford')
```

### Methods

The constructor method is special, it is where you initialize properties, it is called automatically when a class is initiated, and it has to have the exact name "constructor", in fact, if you do not have a constructor method, JavaScript will add an _invisible and empty_ constructor method.

You are also free to make your own methods, the syntax should be familiar:

Example

Create a method named `present`:

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
  present() {
    return `I have a ${this.carname}`
  }
}

const mycar = new Car('Ford')

console.log( mycar.present() )
```

As you can see in the example above, you call the method by referring to the object's method name followed by parentheses (any parameters would go inside the parentheses).

Example

Send a parameter to the `present()` method:

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
  present(introduction) {
    return `${introduction}, I have a ${this.carname}`
  }
}

const mycar = new Car('Ford')

console.log( mycar.present('Hello') )
```

### Static Methods

Static methods are defined on the class itself, and not on the prototype.

That means you cannot call a static method on the object (mycar), but on the class (Car):

```js
 class Car {
  constructor(brand) {
    this.carname = brand
  }
  static hello() {
    return 'Hello!!'
  }
}

mycar = new Car('Ford')

//Call 'hello()' on the class Car:
console.log( Car.hello() )

//and NOT on the 'mycar' object:
//console.log(mycar.hello())
//this would raise an error.
```

If you want to use the mycar object inside the static method, you can send it as a parameter:

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
  static hello(car) {
    return `Hello ${car.carname}`
  }
}

const mycar = new Car('Ford')

console.log( Car.hello(mycar) )
```

### Inheritance

To create a class inheritance, use the `extends` keyword.

A class created with a class inheritance inherits all the methods from another class:

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
  present() {
    return `I have a ${this.carname}`
  }
}

class Model extends Car {
  constructor(brand, model) {
    super(brand)
    this.model = model
  }
  show() {
    return `${this.present()} , it is a ${this.model}`
  }
}

const mycar = new Model('Ford', 'Mustang')
console.log( mycar.show() )
```

The `super()` method refers to the parent class.

By calling the `super()` method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods.

> Inheritance is useful for code reusability: reuse properties and methods of an existing class when you create a new class.

### Getters and Setters

Classes also allows you to use getters and setters.

It can be smart to use getters and setters for your properties, especially if you want to do something special with the value before returning them, or before you set them.

To add getters and setters in the class, use the `get` and `set` keywords.

Example

Create a getter and a setter for the "carname" property:

```js
class Car {
  constructor(brand) {
    this.carname = brand
  }
  get name() {
    return this.carname;
  }
  set name(name) {
    this.carname = name;
  }
}

const mycar = new Car('Ford');

console.log( mycar.name )
```

::: tip 💡 No parentheses
even if the getter is a method, you do not use parentheses when you want to get the property value.
:::

The name of the getter/setter method cannot be the same as the name of the property, in this case `carname`.

Many programmers use an underscore character `_` before the property name to separate the getter/setter from the actual property:

Example

You can use the underscore character to separate the getter/setter from the actual property:

```js
class Car {
  constructor(brand) {
    this._carname = brand
  }
  get carname() {
    return this._carname
  }
  set carname(name) {
    this._carname = name
  }
}

const mycar = new Car('Ford')

console.log( mycar.carname )
```

To use a setter, use the same syntax as when you set a property value, without parentheses:

Example

Use a setter to change the carname to "Volvo":

```js
class Car {
  constructor(brand) {
    this._carname = brand
  }
  get carname() {
    return this._carname
  }
  set carname(name) {
    this._carname = name;
  }
}

const mycar = new Car('Ford')
mycar.carname = 'Volvo'
console.log( mycar.carname)
```

## Destructuring

> Source: <https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operatoren/Destructuring_assignment>
>
> Source: <https://www.freecodecamp.org/news/learn-es6-the-dope-way-part-iv-default-parameters-destructuring-assignment-a-new-es6-method-44393190b8c9/>

The destructuring assignment syntax is a JavaScript expression that makes it possible to extract data from arrays or objects into distinct variables.

Syntax

```js
const a, b, rest;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

[a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]

({a, b} = {a:1, b:2});
console.log(a); // 1
console.log(b); // 2
```

### Object Destructuring

```js
const o = {
  p: 42,
  q: true
};

const {p, q} = o;

console.log(p); // 42
console.log(q); // true
```

### Array Destructuring

```js
const foo = ["one", "two", "three"];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

## Modules

### CommonJS Modules

> Source: <https://nodejs.org/docs/latest/api/modules.html>

In the Node.js module system, each file is treated as a separate module. For example, consider a file named `foo.js`:

```js
const circle = require('./circle.js')

console.log(`The area of a circle of radius 4 is ${circle.area(4)}`)

```

On the first line, `foo.js` loads the module `circle.js` that is in the same directory as foo.js.

Here are the contents of `circle.js`:

```js
const { PI } = Math

exports.area = function(r) {
  return PI * r ** 2
}

exports.circumference = function(r) {
  return 2 * PI * r
}
```

The module `circle.js` has exported the functions `area()` and `circumference()`. Functions and objects are added to the root of a module by specifying additional properties on the special exports object.

Variables local to the module will be private, because the module is wrapped in a function by Node.js (see module wrapper). In this example, the variable PI is private to `circle.js`.

The module.exports property can be assigned a new value (such as a function or object).

Below, `bar.js` makes use of the `square` module, which exports a Square class:

```js
const Square = require('./square.js')
const mySquare = new Square(2)
console.log(`The area of mySquare is ${mySquare.area()}`)

```

The square module is defined in `square.js`:

```js
// Assigning to exports will not modify module, must use module.exports
module.exports = class Square {
  constructor(width) {
    this.width = width
  }

  area() {
    return this.width ** 2
  }
};

```

The module system is implemented in the `require('module')` module.

#### Other example

File: `lib/pressure-converter.js`

```js
const PsiBarRatio = 0.0689476

class PressureConverter {
    barToPsi(value) {
        return value / PsiBarRatio
    }

    psiToBar(value) {
        return value * PsiBarRatio
    }
}

module.exports = PressureConverter
```

File: `index.js`

```js
const PressureConverter = require('./lib/pressure-converter')

const pc = new PressureConverter()

const pressure = pc.barToPsi(1)
const pressure2 = pc.psiToBar(14)

console.log(`1 bar = ${pressure} psi`)
console.log(`14 psi = ${pressure2} bar`)
```

### ES6 version

Change the export to default

```js
export default class PressureConverter {...}
```

Use import instead of require

```js
import PressureConverter from './lib/pressure-converter.js'
```

Result

```js
const PsiBarRatio = 0.0689476

export default class PressureConverter {
  barToPsi(value) {
    return value / PsiBarRatio
  }

  psiToBar(value) {
    return value * PsiBarRatio
  }
}
```

```js
import PressureConverter from './lib/pressure-converter.js'

const pc = new PressureConverter()

const pressure = pc.barToPsi(1)
const pressure2 = pc.psiToBar(14)

console.log(`1 bar = ${pressure} psi`)
console.log(`14 psi = ${pressure2} bar`)
```

Let node know you are using ES6 by adding this to the `package.json` file (if there is no `package.json` file, just add it)

```json
{
  "type": "module"
}
```

#### Default Exports

```js
const PsiBarRatio = 0.0689476

export default class PressureConverter {
  barToPsi(value) {
    return value / PsiBarRatio
  }

  psiToBar(value) {
    return value * PsiBarRatio
  }
}
```

```js
import PressureConverter from './lib/pressure-converter.js'

const pc = new PressureConverter()

const pressure = pc.barToPsi(1)
const pressure2 = pc.psiToBar(14)

console.log(`1 bar = ${pressure} psi`)
console.log(`14 psi = ${pressure2} bar`)
```

#### Multiple Exports

```js
const PsiBarRatio = 0.0689476
export default PsiBarRatio

export function barToPsi(value) {
  return value / PsiBarRatio
}

export function psiToBar(value) {
  return value * PsiBarRatio
}
```

```js
import PsiBarRatio, { barToPsi, psiToBar } from './lib/pressure-converter.js'

const pressure = barToPsi(1)
const pressure2 = psiToBar(14)

console.log(`1 bar = ${pressure} psi`)
console.log(`14 psi = ${pressure2} bar`)
console.log(`The ratio between psi and bar is ${PsiBarRatio}`)
```

#### Import Alias

```js
import PsiBarRatio, { barToPsi as btp, psiToBar as ptb } from './lib/pressure-converter.js'

const pressure = barToPsi(1)
const pressure2 = psiToBar(14)

console.log(`1 bar = ${pressure} psi`)
console.log(`14 psi = ${pressure2} bar`)
```

## Callback hell

<https://www.freecodecamp.org/news/how-to-deal-with-nested-callbacks-and-avoid-callback-hell-1bc8dc4a2012/>

```js
// Makes a burger
// makeBurger contains four steps:
//   1. Get beef
//   2. Cook the beef
//   3. Get buns for the burger
//   4. Put the cooked beef between the buns
//   5. Serve the burger (from the callback)
// We use callbacks here because each step is asynchronous.
//   We have to wait for the helper to complete the one step
//   before we can start the next step

const makeBurger = nextStep => {
  getBeef(function(beef) {
    cookBeef(beef, function(cookedBeef) {
      getBuns(function(buns) {
        putBeefBetweenBuns(buns, beef, function(burger) {
          nextStep(burger);
        });
      });
    });
  });
};
```

## Promises

```js
console.log('-- start --')
timeConsumingOperation()
.then( () => anOtherTimeConsumingOperation() )
.then( () => timeConsumingOperation() )
.then( () => anOtherTimeConsumingOperation() )
.then( () => console.log('-- done --'))
```

```js
function timeConsumingOperation() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('timeConsumingOperation() done!')
      resolve()
    }, 2000)
  })
}

function anOtherTimeConsumingOperation() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('anOtherTimeConsumingOperation() done!')
      resolve()
    }, 1000)
  })
}

```

## Async Await

```js
(async () => {
  console.log('-- start --')
  await timeConsumingOperation()
  await anOtherTimeConsumingOperation()
  await timeConsumingOperation()
  await anOtherTimeConsumingOperation()
  console.log('-- done --')
})()
```

```js
function timeConsumingOperation() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('timeConsumingOperation() done!')
      resolve()
    }, 2000)
  })
}

function anOtherTimeConsumingOperation() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('anOtherTimeConsumingOperation() done!')
      resolve()
    }, 1000)
  })
}
```