// Constructor Inheritance - (Zakas p72)

// Male will inherit ALL of the Human properties
function Human(x, y) {
  // Following properties will be inherited
  this.name = x;
  this.age = y;
  this.test = "Test 1";
}
// Following properties will ALSO be inherited
Human.prototype.citizen = "USA";
Human.prototype.employer = "Google";
Human.prototype.test = "Test 2";

function Male(x, y) {
  // Following properties will be the own properties of Male instances
  this.name = x;
  this.age = y;
  this.gender = "Male";
}

// Inheritance - Connecting Male object with Human object
Male.prototype = new Human(); // no arguments are passed
Male.prototype.constructor = Male; // correcting constructor property

var albert = new Male("Albert", 25);



// Testing

albert.name; // return "Albert"
albert.test; // return "Test 1"
albert.citizen; // return "USA"

albert.__proto__.test; // return "Test 1"
albert.__proto__.__proto__.test; // return "Test 2"

albert instanceof Male; // return true
albert instanceof Human; // return true

albert.constructor; // return function Male(x, y) {...}
Human.constructor; // return function Function() { [native code] }

typeof albert; // return object
typeof Human; // return function

Male.prototype.isPrototypeOf(albert); // return TRUE, equals to albert.__proto__
Human.isPrototypeOf(albert); // return FALSE, since the prototype of albert is the instance of Human
Human.prototype.isPrototypeOf(albert); // return TRUE, equals to albert.__proto__.__proto__

albert.hasOwnProperty("name"); // return true
albert.hasOwnProperty("test"); // return false
albert.hasOwnProperty("citizen"); // return false

Human.hasOwnProperty("name"); // return TRUE, since ES6 has built in property called 'name'. Human.name will return 'Human'
Human.hasOwnProperty("age"); // return FALSE, since Human function doesn't have an 'age' property. Instances created with 'new' do.
Male.hasOwnProperty("name"); // return TRUE, since ES6 has built in property called 'name'. Male.name will return 'Male'
Male.hasOwnProperty("age"); // return FALSE, since Human function doesn't have an 'age' property. Instances created with 'new' do.

/*

If prototype chain is like illustrated diagram below
A (an instance or object) ---> Prototype of A ---> Prototype of (Prototype of A) ---> Object.prototype ---> null

Then, above snippet will have an illustrated diagram like:
albert ---> albert.__proto__ or Male.prototype --> albert.__proto__.__proto__ or Human.prototype ---> Object.prototype ---> null


If we use above pattern then
- We use constructor function and 'new' keyword
- We are messing around explicitly with 'objectName.prototype'
- All properties from Human will be inherited to albert, although some of them will be override by albert

*/

// Instead of using this
function Male(x, y) {
  this.name = x;
  this.age = y;
  this.gender = "Male";
}
Male.prototype = new Human();
Male.prototype.constructor = Male;

// We should use following for BEST PRACTICE
function Male(x, y) {
  Human(this, x, y); // calling Human to setup own properties of Male that are similar to the own properties inside Human
  this.gender = "Male";
}
Male.prototype = Object.create(Human.prototype); // to inherit Human prototype properties
Male.prototype.constructor = Male; // then we still need to correct the constructor of Male
