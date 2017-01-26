/*
  Creational Pattern - Dealing with how an object is created or instantiated.
  There are 6 creational pattern availables:
    1. Object Literals - Basic
    2. Object.create() - Basic
    3. Constructor Function - Basic
    4. Singleton - Advanced
    5. Factory Function - Advanced
    6. Prototype Pattern *
*/

// ================================================================================================= 1 - Object Literals
// Very simple to understand

var objName = {};

// ================================================================================================= 2 - Object.create()
// The Object.create() method creates a new object with the specified prototype object and properties.

Object.create(proto[, propertiesObject])

var parent = {
  name : "John",
  age : 40,
  hair : "Straight",
  race : "White"
};

var child = Object.create(parent, {
  "name" : {
    value : "Christie",
    enumerable : true,
    configurable : true,
    writable : true
  },
  "age" : {
    value : 12,
    enumerable : true,
    configurable : true,
    writable : true
  }
});
child.name; // return "Christie"
child.hair; // return "Straight"
child.race; // return "White"

// ============================================================================================ 3 - Constructor Function

function Person(x,y) {
  this.name = x;
  this.age = y;
}
Person.prototype.race = "White";
Person.prototype.sayHi = function() {
  console.log("Hi, I'm " + this.name);
};

var bobby = new Person("Bobby", 21);
var andrea = new Person("Andrea", 22);

bobby.age; // return 21
bobby.race; // return "White"
bobby.sayHi(); // return "Hi, I'm Bobby"

andrea.name; // return "Andrea"
andrea.race; // return "White"

// ======================================================================================================= 4 - Singleton
// Singleton pattern will be used when you need ONLY ONE object for the given kind (class).
// Singleton should be avoided if you can.

// The most basic implementation of singleton is Object Literal (some people doubt this concept).

var SingletonObj = {};

// or ----------------------------------------------------------------- 
// if you want 'simple singleton' with private method (below is also called module pattern)

var Singleton = (function() {
  var privateVar = '';

  function privateMethod() {
    // ...
  }

  return { // public interface
    publicMethod1: function() {
      // all private members are accesible here
    },
    publicMethod2: function() {
    }
  };
})(); // IIF

// or -----------------------------------------------------------------

var Foo = (function() {
  var instance;
  function init(x, y) {
    var _priVar = 2;
    var name = x;
    var age = y + _priVar;
    var log = function() {
      console.log("Hello");
    };
    
    return {
      name : name,
      age : age,
      log : log
    };
  }
  return {
    getInstance : function(x, y) {
      if (!instance) {
        instance = init(x, y);
        return instance;
      } else {
        return instance;
      }
    }
  };
})(); // IIF

var a = new Foo("Albert", 20); // doesn't work - Foo() is not constructor function
var b = new Foo("Bob", 22); // doesn't work - Foo() is not constructor function
var c = Foo("Cindy", 24); // doesn't work - Foo() is not constructor function

var d = Foo.getInstance("David", 26); // works fine
var e = Foo.getInstance("Elly", 28)// works fine but e.name still return 'David'

d == e; // true

// or -----------------------------------------------------------------

var Foo = (function() {
   
    var instance;
    var _priVar = 2;
    var log = function() {
      console.log("Hello");
    };
  
    function Singleton(x, y) {
        if (instance) {
            return instance;
        }
        
        this.name = x;
        this.age = y + _priVar;
        this.log = log;
      
        instance = this;
    }
    Singleton.getInstance = function() {
        return instance || new Singleton();
    }
    return Singleton;
}()); // IIF

var a = new Foo("Bob", 24); // works fine
var b = new Foo(); // works fine
var c = Foo(); // works fine
var d = Foo.getInstance(); // works fine

a == b; // true
a == c; // true
a == d; // true
a.name; // 'Bob'
b.age; // 26
c.log(); // 'Hello'
d.name; // 'Bob'

// ================================================================================================ 5 - Factory Function

function Sedan(options) {
  this.year = options.year || 2000;
  this.door = 4;
  this.color = options.color || "White";
}
function SUV(options) {
  this.year = options.year || 2000;
  this.door = 5;
  this.color = options.color || "White";
}
function Truck(options) {
  this.year = options.year || 2000;
  this.door = 2;
  this.color = options.color || "White";
}
function Sport(options) {
  this.year = options.year || 2000;
  this.door = 2;
  this.color = options.color || "White";
}
function CarFactory() {}
CarFactory.prototype.constructorToUse = Sedan;
CarFactory.prototype.create = function(options) {
  switch (options.vahicleType) {
    case "Sedan":
      this.constructorToUse = Sedan;
      break;
    case "SUV":
      this.constructorToUse = SUV;
      break;
    case "Truck":
      this.constructorToUse = Truck;
      break;
    case "Sport":
      this.constructorToUse = Sport;
      break;
  }
  return new this.constructorToUse(options); // don't forget this, it's important link
};

// Usage Cases
// Case 1 - BMWFactory made Sedan, SUV, Truck, and Sport cars.
var BMWFactory = new CarFactory();
var BMW3Series = BMWFactory.create({
  "vahicleType" : "Sedan",
  "year" : 2017,
  "manufacturer" : "BMW", // this property is not used yet in Sedan, SUV, Truck, or Sport constructor
  "color" : "Black"
});

BMW3Series.vehicleType; // return "Sedan"
BMW3Series.year; // return 2017
BMW3Series.door; // return 4
BMW3Series.manufacturer; // return undefined, since we just pass it as arguments withour using it for property/method

// Case 2 - SportFactory only made Sport car.
var SportFactory = new CarFactory();
var BMWi8 = SedanFactory.create({
  "vehicleType" : "Sport",
  "year" : 2016,
  "manufacturer" : "BMW",
  "color" : "Blue"
});

// or -----------------------------------------------------------------

function Sedan(options) {
  this.year = options.year || 2000;
  this.door = 4;
  this.color = options.color || "White";
}
function SUV(options) {
  this.year = options.year || 2000;
  this.door = 5;
  this.color = options.color || "White";
}
function Truck(options) {
  this.year = options.year || 2000;
  this.door = 2;
  this.color = options.color || "White";
}
function Sport(options) {
  this.year = options.year || 2000;
  this.door = 2;
  this.color = options.color || "White";
}
function CarFactory() {
  this.create = function(options) {
    switch (options.vehicleType) {
      case "Sedan":
        var constructorToUse = new Sedan(options);
        break;
      case "SUV":
        var constructorToUse = new SUV(options);
        break;
      case "Truck":
        var constructorToUse = new Truck(options);
        break;
      case "Sport":
        var constructorToUse = new Sport(options);
        break;
    }
    return constructorToUse;
  };
}
var BMWFactory = new CarFactory();
var BMW3Series = BMWFactory.create({
  "vehicleType" : "Sedan",
  "year" : 2017,
  "manufacturer" : "BMW", // this property is not used yet in Sedan, SUV, Truck, or Sport constructor
  "color" : "Black"
});