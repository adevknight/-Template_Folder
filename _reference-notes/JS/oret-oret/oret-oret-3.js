function Grandparent() {
  this.name = "Granpa";
}
Grandparent.prototype.age = 75;
Grandparent.prototype.toString = function() {
  var c = this.constructor;
  return c.uber ?
    c.uber.toString() + ', ' + this.name :
    this.name;
};

function Parent() {
  this.name = "Dad";
}
function F() {}
F.prototype = Grandparent.prototype;
Parent.prototype = new F();
Parent.prototype.constructor = Parent;
Parent.uber = Grandparent.prototype;
Parent.prototype.age = 50;


function Children() {
  this.name = "Bobby"
}
F.prototype = Parent.prototype;
Children.prototype = new F();
Children.prototype.constructor = Children;
Children.uber = Parent.prototype;
Children.prototype.age = 25;

var insChild = new Children();

// 181