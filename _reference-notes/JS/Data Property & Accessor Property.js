// ======================================================================================================= Data Property
var albert = {};
Object.defineProperty(person, "name", {
  value : "Albert",

  // Common in Data Property and Accessor Property
  enumerable : true, // If we don't specify (default value) then it is false.
  configurable : true, // If we don't specify (default value) then it is false.

  // Only Available in Data Property
  writable : true // If we don't specify (default value) then it is false.
});

// or -----------------------------------------------------------------

var albert = {};
Object.defineProperties(albert, {
  "name" : {
    value : "Albert",
    enumerable : true,
    configurable : true,
    writable : true 
  },
  "age" : {
    value : 22,
    enumerable : true,
    configurable : true,
    writable : true
  },
  "gender" : {
    value : "Male",
    enumerable : true,
    configurable : true,
    writable : true
  }
});

// or -----------------------------------------------------------------

var albert = {
  name : "Albert",
  age : 22,
  gender : "Male"
};

// Enumerable: If true, the property will be iterated over when a user does for (var prop in obj){} (or similar).
// Configurable: If false, any attempts to delete the property or change its attributes (Writable, Configurable, or enumerable) will fail.
// Writable: If false, the value of the property can not be changed.

// =================================================================================================== Accessor Property
var person = {
  _name : undefined
};
Object.defineProperty(person, "name", {
  // A property can have one GETTER, one SETTER, or even BOTH GETTER and SETTER
  get : function() {
    if (!this._name) {
      return "Albert"
    } else {
      return this._name;
    }
  },
  set : function(y) {
    this._name = y;
  },
  enumerable : true,
  configurable : true
});

person.name; // return (GETTER) "Albert"
person.name = "Bob"; // assigning (SETTER) "Bob"
person.name; // return (GETTER) "Bob"

// or -----------------------------------------------------------------

var person = {};
Object.defineProperties(person, {
  "_name" : { // private property
    value : undefined,
    enumerable : true,
    configurable : true,
    writable : true
  },
  "_fullName" : { // private property
    value : undefined,
    enumerable : true,
    configurable : true,
    writable : true
  },
  "name": {
    get : function() {
      if (!this._name) {
        return "Albert";
      } else {
        return this._name;
      }
    },
    set : function(y) {
      this._name = y;
      this._fullName = y;
    },
    enumerable : true,
    configurable : true
  },
  "fullName": {
    get : function() {
      if (!this._fullName) {
        return "Albert";
      } else {
        return this._fullName;
      }
    },
    set : function(y) {
      this._name = y;
      this._fullName = y;
    },
    enumerable : true,
    configurable : true
  }
  // other properties/methods
});

person.name; // return (GETTER) "Albert"
person.fullName; // return (GETTER) "Albert"

person.name = "Bob"; // assigning (SETTER) "Bob"

person.name; // return (GETTER) "Bob"
person.fullName; // return (GETTER) "Bob"

// or -----------------------------------------------------------------

var person = {
  _name : undefined,
  _fullName : undefined,
  get name() {
    if (!this._name) {
      return "Albert";
    } else {
      return this._name;
    }
  },
  set name(y) {
    this._name = y;
    this._fullName = y;
  },
  get fullName() {
    if (!this._fullName) {
      return "Albert";
    } else {
      return this._fullName;
    }
  },
  set fullName(y) {
    this._name = y;
    this._fullName = y;
  }
};

person.name; // return (GETTER) "Albert"
person.fullName; // return (GETTER) "Albert"

person.name = "Bob"; // assigning (SETTER) "Bob"

person.name; // return (GETTER) "Bob"
person.fullName; // return (GETTER) "Bob"

// Notes on using the GETTER
person.name("albert");
// Passing argument to getter (or what we think as a getter) will throw an ERROR,
// because it is IMPOSSIBLE to pass arguments for getter, since JS engine will just
// consider it you call 'name' method of person object