// Object Inheritance - (Zakas p69)

// Human is 'supertype' of Albert
var Human = {
  // all properties below will be inherited
  name : "",
  age : "30",
  gender : "",
  placeOfBirth : "Earth",
  introduce : function() {
    // Hi, My name is Albert, and I'm 30 y.o. male from Earth.
    return "Hi, My name is " + this.name + ", and I'm " + this.age + " y.o. " + this.gender + " from " + this.placeOfBirth + "."; 
  }
};

// Albert is 'subtype' of Human
var Albert = Object.create(Human, {
  // all properties below will be own properties of Albert
  name : {
    value: "Albert",
    writable : true,
    enumerable : true,
    configurable : true
  },
  age : {
    value: 20,
    writable : true,
    enumerable : true,
    configurable : true
  },
  gender : {
    value: "male",
    writable : true,
    enumerable : true,
    configurable : true
  },
  placeOfBirth : {
    value: "Miami",
    writable : true,
    enumerable : true,
    configurable : true
  },
});



// Testing

Albert.name; // return "ALbert"
Albert.placeOfBirth; // return "Miami"
Albert.introduce(); // return "Hi, My name is Albert, and I'm 20 y.o. male from Miami."

Albert instanceof Human; // return Uncaught TypeError: Right-hand side of 'instanceof' is not callable(…)

Albert.constructor; // return function Object() { [native code] }
Human.constructor; // return function Object() { [native code] }

typeof Albert; // return object
typeof Human; // return object

Human.isPrototypeOf(Albert); // return true

Albert.hasOwnProperty("name"); // return true
Albert.hasOwnProperty("introduce"); // return false
Human.hasOwnProperty("introduce"); // return true

/*

If prototype chain is like illustrated diagram below
A (an instance or object) ---> Prototype of A ---> Prototype of (Prototype of A) ---> Object.prototype ---> null

Then, above snippet will have an illustrated diagram like:
Albert ---> Albert.__proto__ or Human (directly) --> Object.prototype ---> null


If we use above pattern then
- We don't use constructor function and 'new' keyword
- We don't mess around explicitly with 'objectName.prototype'
- All properties from Human will be inherited to Albert, although some of them will be override by Albert

*/